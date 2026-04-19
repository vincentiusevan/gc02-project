import { IWishlist } from '@/types/wishlist';
import { getDB } from '../config/mongodb';
import { ObjectId, WithId } from 'mongodb';
import z from 'zod';
import { IProduct } from '@/types/product';
import Product from './Product';

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

  static async getWishlistProducts(userId: string) {
    const collection = this.getCollection();

    const wishlists = await collection
      .aggregate<{ product: WithId<IProduct> }>([
        {
          $match: {
            userId: new ObjectId(userId),
          },
        },
        {
          $lookup: {
            from: 'products',
            localField: 'productId',
            foreignField: '_id',
            as: 'product',
          },
        },
        {
          $unwind: '$product',
        },
      ])
      .toArray();

    return wishlists.map((wishlist) => {
      return Product.formatProduct(wishlist.product);
    });
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
