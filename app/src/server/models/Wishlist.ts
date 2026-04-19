import { IWishlist } from '@/types/wishlist';
import { getDB } from '../config/mongodb';
import { ObjectId } from 'mongodb';
import z from 'zod';

const wishlistSchema = z.object({
  userId: z.string().trim().min(1),
  productId: z.string().trim().min(1),
});

export default class Wishlist {
  static getCollection() {
    const collection = getDB().collection<IWishlist>('wishlist');
    return collection;
  }

  static async getWishlists(userId: string) {
    const collection = this.getCollection();

    const wishlists = await collection
      .find({
        userId: new ObjectId(userId),
      })
      .toArray();

    return wishlists;
  }

  static async addWishlist(body: { userId: string; productId: string }): Promise<string> {
    wishlistSchema.parse(body);

    const collection = this.getCollection();

    await collection.insertOne({
      userId: new ObjectId(body.userId),
      productId: new ObjectId(body.productId),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return 'add wishlist berhasil';
  }

  static async removeWishlist(body: { userId: string; productId: string }): Promise<string> {
    wishlistSchema.parse(body);

    const collection = this.getCollection();

    await collection.deleteOne({
      userId: new ObjectId(body.userId),
      productId: new ObjectId(body.productId),
    });

    return 'remove wishlist berhasil';
  }
}
