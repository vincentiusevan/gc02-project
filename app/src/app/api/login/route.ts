import { errorHandler } from '@/server/helpers/errorHandler';
import User from '@/server/models/User';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const token = await User.login(body);
    const cookieStore = await cookies();

    cookieStore.set({
      name: 'access_token',
      value: token,
      httpOnly: true,
      path: '/',
    });

    return Response.json({ message: 'login berhasil' }, { status: 200 });
  } catch (err: unknown) {
    const { message, status } = errorHandler(err);
    return Response.json({ message }, { status });
  }
}
