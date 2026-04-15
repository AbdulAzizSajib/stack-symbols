export const USER_ROLES = {
    ADMIN: "ADMIN",
    USER: "USER",
} as const;

export const VISIBILITY = {
    PUBLIC: "PUBLIC",
    PRIVATE: "PRIVATE",
    UNLISTED: "UNLISTED",
} as const;

export const SVG_USAGE_TYPES = {
    LINK: "link",
    EMBED: "embed",
    EXTERNAL_EMBED: "external_embed",
} as const;

export const SVG_MAX_BYTES = 5 * 1024 * 1024;

export const TOKEN_KEYS = {
    ACCESS: "accessToken",
    REFRESH: "refreshToken",
    SESSION: "better-auth.session_token",
} as const;
