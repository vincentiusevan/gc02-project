import { IUser } from '@/types/user';
import { getDB } from '../config/mongodb';
import { comparePassword, hashPassword } from '../helpers/bcrypt';
import { ObjectId } from 'mongodb';
import z from 'zod';
import { UnauthorizedError } from '../helpers/CustomError';
import { signToken } from '../helpers/jwt';

const userSchema = z.object({
  name: z.string().trim(),
  username: z.string().trim().min(1),
  email: z.email().trim(),
  password: z.string().trim().min(5),
});

const loginSchema = z.object({
  email: z.email().trim(),
  password: z.string().trim().min(1),
});

export default class User {
  static getCollection() {
    const collection = getDB().collection<IUser>('users');
    return collection;
  }

  static async getUserById(id: string) {
    const collection = this.getCollection();

    const user = await collection.findOne({
      _id: new ObjectId(id),
    });

    return user;
  }

  static async register(body: IUser): Promise<string> {
    userSchema.parse(body);

    const collection = this.getCollection();

    const username = await collection.findOne({ username: body.username });
    if (username) {
      throw new Error('Username already exists');
    }

    const email = await collection.findOne({ email: body.email });
    if (email) {
      throw new Error('Email already exists');
    }

    body.password = hashPassword(body.password);

    await collection.insertOne(body);

    return 'register berhasil';
  }

  static async login(body: Pick<IUser, 'email' | 'password'>): Promise<string> {
    loginSchema.parse(body);

    const collection = this.getCollection();

    const user = await collection.findOne({ email: body.email });
    if (!user) {
      throw new UnauthorizedError('Invalid email/password');
    }

    const isValidPassword = comparePassword(body.password, user.password);
    if (!isValidPassword) {
      throw new UnauthorizedError('Invalid email/password');
    }

    return signToken({
      _id: user._id.toString(),
      email: user.email,
    });
  }
}
