
import type {
    User,
    UserRecord,
    CreateUserData,
    UpdateUserData
} from './user.model.js';

import type {
    PaginationData,
    PaginationParams,
    PaginatedResult
} from '../../shared/pagination/pagination.model.js';


export interface IUserRepository {

    findByEmail(
        email: string
    ): Promise<UserRecord | null>;

    create(
        data: CreateUserData
    ): Promise<User>;

    findById(
        id: string
    ): Promise<UserRecord | null>;

    findAll(
        pagination: PaginationParams
    ): Promise<PaginationData<User>>;

    update(
        id: string,
        data: UpdateUserData
    ): Promise<User | null>;

    delete(
        id: string
    ): Promise<void>;
}
