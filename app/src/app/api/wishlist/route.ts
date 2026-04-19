import Wishlist from '@/server/models/Wishlist';
import { ZodError } from 'zod';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return Response.json({ message: 'userId is required' }, { status: 400 });
  }

  const wishlists = await Wishlist.getWishlists(userId);

  return Response.json(wishlists, { status: 200 });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const message = await Wishlist.addWishlist(body);

    return Response.json({ message }, { status: 201 });
  } catch (err: unknown) {
    if (err instanceof ZodError) {
      const messages = err.issues.map((issue) => {
        return `${issue.path} - ${issue.message}`;
      });

      return Response.json({ message: messages.join('; ') }, { status: 400 });
    }

    if (err instanceof Error) {
      return Response.json({ message: err.message }, { status: 400 });
    }

    return Response.json({ message: 'ISE' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const message = await Wishlist.removeWishlist(body);

    return Response.json({ message }, { status: 200 });
  } catch (err: unknown) {
    if (err instanceof ZodError) {
      const messages = err.issues.map((issue) => {
        return `${issue.path} - ${issue.message}`;
      });

      return Response.json({ message: messages.join('; ') }, { status: 400 });
    }

    if (err instanceof Error) {
      return Response.json({ message: err.message }, { status: 400 });
    }

    return Response.json({ message: 'ISE' }, { status: 500 });
  }
}
