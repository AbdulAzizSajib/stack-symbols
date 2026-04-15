export interface ICategory {
    id: string;
    name: string;
    slug: string;
    description?: string;
    color?: string;
    icon?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface ICreateCategoryPayload {
    name: string;
    description?: string;
    color?: string;
    icon?: string;
}

export interface IUpdateCategoryPayload {
    name?: string;
    description?: string;
    color?: string;
    icon?: string;
}

export interface ICategoryListQuery {
    page?: number;
    limit?: number;
    search?: string;
}
