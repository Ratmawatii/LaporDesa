import { postgres } from '../../infrastructure/database/postgres.js';

import { PostgresUserRepository } from './user.repository.pg.js';

import { RegisterUserUseCase } from './user.usecase.js';

import { UserHandler } from './user.handler.js';

import { createUserRoutes } from './user.route.js';

// Repository
const userRepository = new PostgresUserRepository(postgres);

// Use Case
const registerUserUseCase = new RegisterUserUseCase(
    userRepository
);

// Handler
const userHandler = new UserHandler(
    registerUserUseCase
);

// Routes
export const userRoutes = createUserRoutes(
    userHandler
);