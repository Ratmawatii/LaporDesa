import type {
    Request,
    Response
} from 'express';

import type { RegisterUserInput } from './user.model.js';

import { GetUserByIdUseCase, RegisterUserUseCase } from './user.usecase.js';

import type { UpdateUserData } from './user.model.js';

import { UpdateUserUseCase } from './user.usecase.js';

import { DeleteUserUseCase } from './user.usecase.js';


export class UserHandler {

    constructor(
        private readonly registerUserUseCase: RegisterUserUseCase,
        private readonly getUserByIdUseCase: GetUserByIdUseCase,
        private readonly updateUserUseCase: UpdateUserUseCase,
        private readonly deleteUserUseCase: DeleteUserUseCase
    ) {}

    register = async (
        req: Request,
        res: Response
    ): Promise<void> => {

        const input = req.body as RegisterUserInput;

        const user = await this.registerUserUseCase.execute(
            input
        );

        res.status(201).json({
            success: true,
            message: 'Registrasi berhasil',
            data: user
        });
    };

    getUserById = async (
        req: Request,
        res: Response
    ): Promise<void> => {
        const id = req.params.id;
 
        if (typeof id !== "string") {
            throw new Error("Invalid user ID");
        }
 
        const user = await this.getUserByIdUseCase.execute(id);
 
        res.status(201).json({
            success: true,
            message: 'Registrasi berhasil',
            data: user
        });
    };

    updateUser = async (
        req: Request,
        res: Response
    ): Promise<void> => {

        const id = req.params.id;
        if (typeof id !== "string") {
            res.status(400).json({
                success: false,
                message: "Invalid user ID"
            });
            return;
        }

        const input = req.body as UpdateUserData;
        const user = await this.updateUserUseCase.execute(
            id, 
            input
        );

        res.status(200).json({
            success: true,
            message: 'Update berhasil',
            data: user
        });
    };
    deleteUser = async (
        req: Request,
        res: Response
    ): Promise<void> => {
        const idParam = req.params.id;
        if (typeof idParam !== "string") {
            res.status(400).json({
                success: false,
                message: "Invalid user ID"
            });
            return;
        }
        const id = idParam;
        await this.deleteUserUseCase.execute(id);

        res.status(200).json({
            success: true,
            message: 'User berhasil dihapus'
        });
    }
}