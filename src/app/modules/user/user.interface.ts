/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { USER_ROLE } from './user.constant';

export type TUser = {
  name: string; // The full name of the user
  email: string; // The email address used for authentication and communication
  password: string; // The securely stored password
  role: 'admin' | 'user'; // The role determining access level, default is "user"
  isBlocked: boolean; // Indicates whether the user is blocked, default is false
};

export interface IUser extends Model<TUser> {
  isUserExists(id: string): Promise<TUser | null>;
  isPasswordCorrect(
    plainTextPassword: string,
    hashPassword: string,
  ): Promise<boolean>;
}

export type TUserRole = keyof typeof USER_ROLE;
