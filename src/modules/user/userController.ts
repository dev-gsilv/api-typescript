import { randomUUID } from 'crypto';
import { Request, Response } from 'express';

import { usersMemory } from '../../database/localData.js';
import { IUser } from './userInteface.js';

export const userCreate = async (req: Request, res: Response) => {
  const { name, email } = req.body;

  const id = randomUUID();

  const user: IUser = {
    id,
    name,
    email,
  };

  usersMemory.push(user);

  res.json(user);
};

export const userIndex = async (req: Request, res: Response) => {
  if (usersMemory.length > 0) {
    return res.status(200).json(usersMemory);
  } else {
    return res
      .status(204)
      .json({ usersMemory, Error: 'No content available.' });
  }
};

export const userShow = async (req: Request, res: Response) => {
  const { user_id } = req.params;

  try {
    const user = usersMemory.find((user) => user.id === user_id);

    res.status(200).json(user);
  } catch (e) {
    res.status(400).json(e);
  }
};

export const userUpdate = async (req: Request, res: Response) => {
  const { user_id } = req.params;
  const { name, email } = req.body;

  try {
    const userIndex = usersMemory.findIndex((user) => user.id === user_id);
    if (userIndex !== -1) {
      const user = {
        id: user_id,
        name,
        email,
      };

      usersMemory[userIndex] = user;

      return res.status(200).json(usersMemory[userIndex]);
    } else {
      return res.status(404).json('User not found.');
    }
  } catch (e) {
    res.status(400).json(e);
  }
};

export const userDelete = async (req: Request, res: Response) => {
  const { user_id } = req.params;

  try {
    const userIndex = usersMemory.findIndex((user) => user.id === user_id);
    if (userIndex !== -1) {
      usersMemory.splice(userIndex, 1);
      return res.status(200).json('User deleted.');
    } else {
      return res.status(404).json('User not found.');
    }
  } catch (e) {
    res.status(400).json(e);
  }
};
