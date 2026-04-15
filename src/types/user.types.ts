import type { IAuthUser, UserRole } from "./auth.types";

export type IUser = IAuthUser;

export interface ICreateAdminPayload {
    password: string;
    role: UserRole;
    admin: {
        name: string;
        email: string;
        contactNumber: string;
        profilePhoto?: string;
    };
}

export interface IUpdateProfilePayload {
    name?: string;
    phone?: string;
    profilePhoto?: File;
}
