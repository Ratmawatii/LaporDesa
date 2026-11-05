import type {   
    PaginationMeta,
    PaginationData,
    PaginatedResult,
    PaginationParams
} from './pagination.model.js';

export const createPaginationResult = <T>(
    results: PaginationData<T>,
    params: PaginationParams
): PaginatedResult<T> => {
    const totalPages = Math.ceil(results.totalItems / params.limit);

    const pagination: PaginationMeta = {
        page: params.page,
        limit: params.limit,
        totalItems: results.totalItems,
        totalPages,
        hasNextPage: params.page < totalPages,
        hasPreviousPage: params.page > 1,
    };

    return {
        data: results.items,
        pagination,
    };
}

export const getPaginationParams = (
    page: number,
    limit: number,
): PaginationParams => {
    return {
        page,
        limit,
        offset: (page - 1) * limit,
        totalItems: 0,
        totalPages: 0
    };
};

export const getPaginationResult = <T> (
    results: PaginationData<T>,
    params: PaginationParams,
): PaginatedResult<T> => {
    const totalPages = Math.ceil(results.totalItems / params.limit);
    const pagination: PaginationMeta = {
        page: params.page,
        limit: params.limit,
        totalItems: results.totalItems,
        totalPages,
        hasNextPage: params.page < totalPages,
        hasPreviousPage: params.page > 1,
    };

    return {
        data: results.items,
        pagination,
    };
}