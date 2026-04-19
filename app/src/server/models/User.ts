import { IUser } from '@/types/user';
import { getDB } from '../config/mongodb';
import { hashPassword } from '../helpers/bcrypt';
import z from 'zod';

const userSchema = z.object({
  name: z.string().trim(),
  username: z.string().trim().min(1),
  email: z.email().trim(),
  password: z.string().trim().min(5),
});

export default class User {
  static getCollection() {
    const collection = getDB().collection<IUser>('users');
    return collection;
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
}
