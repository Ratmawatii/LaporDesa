import type {
    Request,
    Response
} from 'express';

import type { RegisterUserInput } from './user.model.js';

import { RegisterUserUseCase } from './user.usecase.js';

export class UserHandler {

    constructor(
        private readonly registerUserUseCase: RegisterUserUseCase
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
}