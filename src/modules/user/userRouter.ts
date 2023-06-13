import { Router } from 'express';

import {
  userCreate,
  userDelete,
  userIndex,
  userShow,
  userUpdate,
} from './userController.js';

export const userRouter = Router();

userRouter.get('/', userIndex);

userRouter.post('/', userCreate);

userRouter.get('/:user_id', userShow);

userRouter.put('/:user_id', userUpdate);

userRouter.delete('/:user_id', userDelete);
