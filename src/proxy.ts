import { NextRequest, NextResponse } from 'next/server';
import { getDefaultDashboardRoute, getRouteOwner, isAuthRoute } from './lib/authUtils';
import { jwtUtils } from './lib/jwtUtils';
import { isTokenExpiringSoon } from './lib/tokenUtils';
import { getNewTokensWithRefreshToken } from './services/auth/refresh-token.action';
import type { UserRole } from './types/auth.types';

async function refreshTokenMiddleware(refreshToken: string): Promise<boolean> {
  try {
    return await getNewTokensWithRefreshToken(refreshToken);
  } catch (error) {
    console.error('Error refreshing token in proxy:', error);
    return false;
  }
}

export async function proxy(request: NextRequest) {
  try {
    const { pathname } = request.nextUrl;
    const pathWithQuery = `${pathname}${request.nextUrl.search}`;
    const accessToken = request.cookies.get('accessToken')?.value;
    const refreshToken = request.cookies.get('refreshToken')?.value;

    const accessSecret = process.env.JWT_ACCESS_SECRET as string;

    const verifyResult = accessToken ? jwtUtils.verifyToken(accessToken, accessSecret) : null;
    const isValidAccessToken = !!verifyResult?.success;
    const decodedAccessToken = verifyResult?.data;

    let userRole: UserRole | null = null;
    let emailVerified: boolean | null = null;
    let needPasswordChange: boolean | null = null;
    let email: string | null = null;

    if (decodedAccessToken && typeof decodedAccessToken === 'object') {
      userRole = decodedAccessToken.role as UserRole;
      emailVerified = decodedAccessToken.emailVerified as boolean;
      needPasswordChange = decodedAccessToken.needPasswordChange as boolean;
      email = decodedAccessToken.email as string;
    }

    const routeOwner = getRouteOwner(pathname);
    const isAuth = isAuthRoute(pathname);

    // Proactively refresh access token if it is about to expire
    if (isValidAccessToken && refreshToken && (await isTokenExpiringSoon(accessToken!))) {
      const requestHeaders = new Headers(request.headers);

      try {
        const refreshed = await refreshTokenMiddleware(refreshToken);
        if (refreshed) {
          requestHeaders.set('x-token-refreshed', '1');
        }
      } catch (error) {
        console.error('Error refreshing token:', error);
      }

      return NextResponse.next({ request: { headers: requestHeaders } });
    }

    // Rule 1: Logged-in users should not access auth pages
    // except verify-email and reset-password (account-state mandated)
    if (
      isAuth &&
      isValidAccessToken &&
      pathname !== '/verify-email' &&
      pathname !== '/reset-password'
    ) {
      return NextResponse.redirect(
        new URL(getDefaultDashboardRoute(userRole as UserRole), request.url)
      );
    }

    // Rule 2: Reset password page rules
    if (pathname === '/reset-password') {
      const emailParam = request.nextUrl.searchParams.get('email');

      if (isValidAccessToken && emailParam) {
        if (needPasswordChange) {
          return NextResponse.next();
        }
        return NextResponse.redirect(
          new URL(getDefaultDashboardRoute(userRole as UserRole), request.url)
        );
      }

      // From forgot-password flow
      if (emailParam) {
        return NextResponse.next();
      }

      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathWithQuery);
      return NextResponse.redirect(loginUrl);
    }

    // Rule 3: Public route -> allow
    if (routeOwner === null) {
      return NextResponse.next();
    }

    // Rule 4: Not logged in trying to hit protected route -> redirect to login
    if (!accessToken || !isValidAccessToken) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathWithQuery);
      return NextResponse.redirect(loginUrl);
    }

    // Rule 5: Enforce verify-email / reset-password based on JWT claims
    if (isValidAccessToken && decodedAccessToken) {
      if (emailVerified === false) {
        if (pathname !== '/verify-email') {
          const verifyEmailUrl = new URL('/verify-email', request.url);
          if (email) verifyEmailUrl.searchParams.set('email', email);
          return NextResponse.redirect(verifyEmailUrl);
        }
        return NextResponse.next();
      }

      if (emailVerified && pathname === '/verify-email') {
        return NextResponse.redirect(
          new URL(getDefaultDashboardRoute(userRole as UserRole), request.url)
        );
      }

      if (needPasswordChange) {
        if (pathname !== '/reset-password') {
          const resetPasswordUrl = new URL('/reset-password', request.url);
          if (email) resetPasswordUrl.searchParams.set('email', email);
          return NextResponse.redirect(resetPasswordUrl);
        }
        return NextResponse.next();
      }
    }

    // Rule 6: Common protected route -> allow
    if (routeOwner === 'COMMON') {
      return NextResponse.next();
    }

    // Rule 7: Role-gated route, user lacks required role -> default dashboard
    if (routeOwner === 'ADMIN' && userRole !== 'ADMIN') {
      return NextResponse.redirect(
        new URL(getDefaultDashboardRoute(userRole as UserRole), request.url)
      );
    }

    return NextResponse.next();
  } catch (error) {
    console.error('Error in proxy:', error);
    return NextResponse.next();
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.well-known).*)'],
};
