import Wishlist from '@/server/models/Wishlist';
import { errorHandler } from '@/server/helpers/errorHandler';
import { UnauthorizedError } from '@/server/helpers/CustomError';

export async function GET(request: Request) {
  try {
    const userId = request.headers.get('x-user-id');

    if (!userId) throw new UnauthorizedError('Silakan login terlebih dahulu');

    const wishlists = await Wishlist.getWishlists(userId);

    return Response.json(wishlists, { status: 200 });
  } catch (err: unknown) {
    const { message, status } = errorHandler(err);
    return Response.json({ message }, { status });
  }
}

export async function POST(request: Request) {
  try {
    const userId = request.headers.get('x-user-id');
    if (!userId) throw new UnauthorizedError('Silakan login terlebih dahulu');

    const body = await request.json();
    const message = await Wishlist.addWishlist({
      userId,
      productId: body.productId,
    });

    return Response.json({ message }, { status: 201 });
  } catch (err: unknown) {
    const { message, status } = errorHandler(err);
    return Response.json({ message }, { status });
  }
}

export async function DELETE(request: Request) {
  try {
    const userId = request.headers.get('x-user-id');
    if (!userId) throw new UnauthorizedError('Silakan login terlebih dahulu');

    const body = await request.json();
    const message = await Wishlist.removeWishlist({
      userId,
      productId: body.productId,
    });

    return Response.json({ message }, { status: 200 });
  } catch (err: unknown) {
    const { message, status } = errorHandler(err);
    return Response.json({ message }, { status });
  }
}
