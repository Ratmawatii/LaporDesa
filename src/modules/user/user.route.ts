import { Router } from 'express';

import { UserHandler } from './user.handler.js';

import { registerUserSchema, userIdSchema } from './user.validation.js';

import { validateBody, validateParams } from '../../shared/middlewares/validate.js';

import { asyncHandler } from '../../shared/utils/async-handler.js';

import { updateUserSchema } from './user.validation.js';

import { PaginationSchema } from '../../shared/pagination/pagination.validation.js';

import { validateQuery } from '../../shared/middlewares/validate.js';

export const createUserRoutes = (
    userHandler: UserHandler
) => {

    const router = Router();
    //register user atau data user baru
    router.post(
        '/register',
        validateBody(registerUserSchema),
        asyncHandler(userHandler.register)
    );
    //get single
    router.get(
        '/:id',
        validateParams(userIdSchema),
        asyncHandler(userHandler.getUserById)
    );
    //update user
    router.patch(
        '/:id',
        validateParams(userIdSchema),
        validateBody(updateUserSchema),
        asyncHandler(userHandler.updateUser)
    );
    //delete user
    router.delete(
        '/:id',
        validateParams(userIdSchema),
        asyncHandler(userHandler.deleteUser)
    );
    //get semua
    router.get(
        '/',
        validateQuery(PaginationSchema),
        asyncHandler(userHandler.getAll)
    );
    return router;
};
