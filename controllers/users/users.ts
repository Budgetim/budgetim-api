import { Response } from 'express';

import User from '../../models/user';

import { AuthenticateRequest, RegisterRequest, VerifyRequest } from './types';
import jwt from 'jsonwebtoken';
import secret from '../../config/secret';
import { sendEmail } from '../../models/emailTransporter';
import bcrypt from 'bcrypt';

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
    { expiresIn: '30d' }
  );
  const html = `
  Hi ${user.name || user.email}!
  <br />
  <br />
  Welcome to BUDGETIM! To verify your email, click the following link:
  <br />
  <br />
  https://api.budgetim.ru/users/verify/${user.id}/${token}
  <br />
  <br />
  BUDGETIM TEAM`;
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
  const token = jwt.sign({ sub: foundedUser.id }, secret, { expiresIn: '30d' });

  if (!access) {
    return res.status(400).send('Wrong username or password');
  }

  res.send({ ...User.omitPassword(foundedUser), token });
};

