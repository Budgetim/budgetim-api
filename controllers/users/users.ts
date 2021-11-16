import { Response } from 'express';

import User from '../../models/user';

import {
  AuthenticateRequest,
  RegisterRequest,
  ResetPasswordRequest,
  UpdateCurrencyRequest,
  UpdatePasswordRequest,
  VerifyRequest
} from './types';
import jwt from 'jsonwebtoken';
import { sendEmail } from '../../models/emailTransporter';
import bcrypt from 'bcrypt';
import { RequestWithUser } from '../../types';

const secret = process.env.BUDGETIM_SECRET;

export const registerUser = async (req: RegisterRequest, res: Response) => {
  const { body } = req;

  const foundedUser = await User.findByEmail({ email: body.email });
  if (foundedUser) {
    return res.status(400).send('User with given email already exist!');
  }

  const user = await User.create(body);

  const token = jwt.sign(
    { sub: user.id },
    secret,
    { expiresIn: '365 days' }
  );
  const html = `
  Hi ${user.name || user.email}!
  <br />
  <br />
  Welcome to BUDGETIM! To verify your email, click the following link:
  <br />
  <br />
  https://api.budgetim.ru/users/verify/${user.id}/${token}`;
  await sendEmail(user.email, 'Verify your email address', html);

  res.send(User.omitPassword(user));
};

export const verify = async (req: VerifyRequest, res: Response) => {
  const { params: { id, token } } = req;
  const user = await User.findById({ id: +id });

  if (!user) {
    return res.status(400).send('Invalid link');
  }

  try {
    const verify = jwt.verify(token, secret) as { sub: string };
    if (verify.sub != id) {
      return res.status(400).send('Invalid link');
    }
  } catch (e) {
    console.log(e);
    return res.status(400).send('Invalid link');
  }

  await User.setVerified({ id: +id });

  res.send('Email verified successfully');
}

export const authenticateUser = async (req: AuthenticateRequest, res: Response) => {
  const { body } = req;

  const foundedUser = await User.findByEmail({ email: body.email });

  if (!foundedUser) {
    return res.status(400).send('User with this email was not found');
  }

  const access = await bcrypt.compare(body.password, foundedUser.password);
  const token = jwt.sign({ sub: foundedUser.id }, secret, { expiresIn: '365 days' });

  if (!access) {
    return res.status(400).send('Wrong username or password');
  }

  res.send({ ...User.omitPassword(foundedUser), token });
};

export const resetPassword = async (req: ResetPasswordRequest, res: Response) => {
  const { body } = req;

  const user = await User.findByEmail({ email: body.email });

  if (!user) {
    return res.status(400).send('User with this email was not found');
  }

  const password = Math.random().toString(36).slice(-8);

  const html = `
  Your password has been reset
  <br />
  <br />
  Your new password: <b>${password}</b>
  <br />
  <br />
  You can change it in BUDGETIM App`;
  await sendEmail(user.email, 'Reset password', html);
  const updatedUser = await User.updatePassword({ id: user.id, password });

  res.send(User.omitPassword(updatedUser));
};

export const getUser = async (req: RequestWithUser, res: Response) => {
  const { userId } = req;
  const user = await User.findById({ id: userId })
  res.send(User.omitPassword(user));
}

export const updateCurrency = async (req: UpdateCurrencyRequest, res: Response) => {
  const { body: { currencyId }, userId } = req;
  const user = await User.updateCurrency({ id: userId, currencyId });
  res.send(User.omitPassword(user));
}

export const updatePassword = async (req: UpdatePasswordRequest, res: Response) => {
  const { body: { password }, userId } = req;
  const user = await User.updatePassword({ id: userId, password });
  res.send(User.omitPassword(user));
}