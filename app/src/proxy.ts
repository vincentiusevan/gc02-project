import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { UnauthorizedError } from './server/helpers/CustomError';
import { errorHandler } from './server/helpers/errorHandler';
import { verifyToken } from './server/helpers/jwt';
import User from './server/models/User';

export default async function proxy(request: NextRequest) {
  try {
    const uri = request.nextUrl.pathname;
    const protectedRoutes = ['/api/wishlist'];

    if (uri.startsWith('/api') && protectedRoutes.includes(uri)) {
      const cookieStore = await cookies();
      const token = cookieStore.get('access_token');

      if (!token) throw new UnauthorizedError('Silakan login terlebih dahulu');

      const payload = verifyToken<{ _id: string; email: string }>(token.value);
      const user = await User.getUserById(payload._id);

      if (!user) throw new UnauthorizedError('Silakan login terlebih dahulu');

      const requestHeaders = new Headers(request.headers);
      requestHeaders.set('x-user-id', user._id.toString());
      requestHeaders.set('x-user-email', user.email);

      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    }

    return NextResponse.next();
  } catch (err: unknown) {
    const { message, status } = errorHandler(err);
    return NextResponse.json({ message }, { status });
  }
}
