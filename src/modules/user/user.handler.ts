import type {
    Request,
    Response
} from 'express';

import type { RegisterUserInput } from './user.model.js';

import { GetUserByIdUseCase, RegisterUserUseCase } from './user.usecase.js';

export class UserHandler {

    constructor(
        private readonly registerUserUseCase: RegisterUserUseCase,
        private readonly getUserByIdUseCase: GetUserByIdUseCase
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
}