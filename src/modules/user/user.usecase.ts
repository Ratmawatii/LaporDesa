import bcrypt from 'bcryptjs';

import type { IUserRepository } from './user.repository.js';

import type {
    User,
    RegisterUserInput,
    UpdateUserData
} from './user.model.js';

import { AppError } from '../../shared/errors/app-error.js';

export class RegisterUserUseCase {

    constructor(
        private readonly userRepository: IUserRepository
    ) {}

    async execute(
        input: RegisterUserInput
    ): Promise<User> {

        const email = input.email.trim().toLowerCase();

        // Check duplicate email
        const existingUser =
            await this.userRepository.findByEmail(email);

        if (existingUser) {
            throw new AppError(
                'Email sudah terdaftar',
                409
            );
        }

        // Hash password
        const passwordHash = await bcrypt.hash(
            input.password,
            12
        );

        // Save user
        const user = await this.userRepository.create({
            name: input.name.trim(),
            email,
            passwordHash
        });

        return user;
    }
}
export class GetUserByIdUseCase {

    constructor(
        private readonly userRepository: IUserRepository
    ) {}

    async execute(
        id: string
    ): Promise<User> {
        const user = await this.userRepository.findById(id);

        if (!user) {
            throw new AppError('User tidak ditemukan', 404);
        }

        return user;
    }
}
export class UpdateUserUseCase {

    constructor(
        private readonly userRepository: IUserRepository
    ) {}

    async execute(
        id: string,
        data: UpdateUserData
    ): Promise<User> {
        const user = await this.userRepository.findById(id);

        if (!user) {
            throw new AppError('User tidak ditemukan', 404);
        }

        if (data.email) {
            const email = data.email.trim().toLowerCase();
            const emailUser = await this.userRepository.findByEmail(email);

            if (emailUser && emailUser.id !== id) {
                throw new AppError(
                    'Email sudah digunakan oleh user lain',
                    409
                );
            }

            data = { ...data, email };
        }

        const updatedUser = await this.userRepository.update(id, data);

        if (!updatedUser) {
            throw new AppError('Gagal memperbarui user', 500);
        }

        return updatedUser;
    }
}   
export class DeleteUserUseCase {

    constructor(
        private readonly userRepository: IUserRepository
    ) {}

    async execute(
        id: string
    ): Promise<void> {
        const deleted = await this.userRepository.delete(id);

        if (deleted !== undefined) {
            throw new AppError('User tidak ditemukan', 404);
        }
    }
}
