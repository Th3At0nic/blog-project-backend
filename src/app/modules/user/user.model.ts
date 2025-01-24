import { model, Schema } from 'mongoose';
import { IUser, TUser } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

const UserSchema = new Schema<TUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
    isBlocked: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

//creating or using mongoose middleware like pre and post
UserSchema.pre('save', async function () {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_round),
  );
});

// hiding the password from the response document to keep the privacy.
UserSchema.post('save', function (doc) {
  doc.password = '';
});

//finding for existing user in the db so prevent duplicate creation
UserSchema.statics.isUserExists = async function (email: string) {
  const existingUser = await UserModel.findOne({ email });
  return existingUser;
};

UserSchema.statics.isPasswordCorrect = async function (
  plainTextPassword: string,
  hashPassword: string,
) {
  const authPassword = await bcrypt.compare(plainTextPassword, hashPassword);
  return authPassword;
};

export const UserModel = model<TUser, IUser>('User', UserSchema);
