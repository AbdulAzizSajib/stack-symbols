export const endpoints = {
    auth: {
        register: "/auth/register",
        verifyEmail: "/auth/verify-email",
        resendOtp: "/auth/resend-otp",
        login: "/auth/login",
        me: "/auth/me",
        refreshToken: "/auth/refresh-token",
        changePassword: "/auth/change-password",
        forgetPassword: "/auth/forget-password",
        resetPassword: "/auth/reset-password",
        googleLogin: "/auth/login/google",
        googleSuccess: "/auth/google/success",
        logout: "/auth/logout",
    },
    users: {
        createAdmin: "/users/create-admin",
        me: "/users/me",
    },
    categories: {
        list: "/categories",
        bySlug: (slug: string) => `/categories/${slug}`,
        byId: (id: string) => `/categories/${id}`,
    },
    tags: {
        list: "/tags",
        bySlug: (slug: string) => `/tags/${slug}`,
    },
    svg: {
        list: "/svg",
        bySlug: (slug: string) => `/svg/${slug}`,
        rawIcon: (slug: string) => `/svg/icons/${slug}`,
        upload: "/svg/upload",
        paste: "/svg/paste",
        track: (slug: string) => `/svg/${slug}/track`,
    },
    usageEvents: {
        list: "/usage-events",
        summary: "/usage-events/summary",
    },
} as const;
