import { cookies } from 'next/headers';
import { verifyToken } from './jwt';
import User from '../models/User';

export async function getUserLogin() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('access_token');

    if (!token) return null;

    const payload = verifyToken<{ _id: string; email: string }>(token.value);
    const user = await User.getUserById(payload._id);

    return user;
  } catch {
    return null;
  }
}
