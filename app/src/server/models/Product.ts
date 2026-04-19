import { IProduct } from '@/types/product';
import { getDB } from '../config/mongodb';
import { WithId } from 'mongodb';

export default class Product {
  static getCollection() {
    const collection = getDB().collection<IProduct>('products');
    return collection;
  }

  static formatProduct(product: WithId<IProduct>): IProduct {
    return {
      ...product,
      _id: product._id.toString(),
      createdAt: new Date(product.createdAt).toISOString(),
      updatedAt: new Date(product.updatedAt).toISOString(),
    };
  }

  static async getProducts(search?: string, page?: string) {
    const collection = this.getCollection();

    const limit = 10;
    const currentPage = Number(page) || 1;
    const skip = (currentPage - 1) * limit;

    const query = search
      ? {
          name: {
            $regex: search,
            $options: 'i',
          },
        }
      : {};

    const products = await collection.find(query).skip(skip).limit(limit).toArray();

    return products.map((product) => {
      return this.formatProduct(product);
    });
  }

  static async getProductBySlug(slug: string) {
    const collection = this.getCollection();

    const product = await collection.findOne({ slug });

    if (!product) return null;

    return this.formatProduct(product);
  }
}
