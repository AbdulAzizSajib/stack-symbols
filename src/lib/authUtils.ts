import type { UserRole } from "@/types/auth.types";

export const authRoutes = ["/login", "/register", "/forgot-password", "/reset-password", "/verify-email"];

export const isAuthRoute = (pathname: string) => {
    return authRoutes.some((route: string) => route === pathname);
};

export type RouteConfig = {
    exact: string[];
    pattern: RegExp[];
};

export const commonProtectedRoutes: RouteConfig = {
    exact: ["/my-profile", "/change-password", "/dashboard"],
    pattern: [],
};

export const adminProtectedRoutes: RouteConfig = {
    exact: [],
    pattern: [/^\/admin(\/.*)?$/],
};

export const isRouteMatches = (pathname: string, routes: RouteConfig) => {
    if (routes.exact.includes(pathname)) {
        return true;
    }
    return routes.pattern.some((pattern: RegExp) => pattern.test(pathname));
};

export type RouteOwner = "ADMIN" | "COMMON" | null;

export const getRouteOwner = (pathname: string): RouteOwner => {
    if (isRouteMatches(pathname, adminProtectedRoutes)) {
        return "ADMIN";
    }

    if (isRouteMatches(pathname, commonProtectedRoutes)) {
        return "COMMON";
    }

    return null;
};

export const getDefaultDashboardRoute = (role: UserRole) => {
    if (role === "ADMIN") {
        return "/admin/dashboard";
    }

    if (role === "USER") {
        return "/dashboard";
    }

    return "/";
};

export const isValidRedirectForRole = (redirectPath: string, role: UserRole) => {
    const sanitizedRedirectPath = redirectPath.split("?")[0] || redirectPath;
    const routeOwner = getRouteOwner(sanitizedRedirectPath);

    if (routeOwner === null || routeOwner === "COMMON") {
        return true;
    }

    return routeOwner === role;
};
