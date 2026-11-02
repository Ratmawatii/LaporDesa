import type {
    User,
    UserRecord,
    CreateUserData
} from './user.model.js';

export interface IUserRepository {

    findByEmail(
        email: string
    ): Promise<UserRecord | null>;

    create(
        data: CreateUserData
    ): Promise<User>;

}