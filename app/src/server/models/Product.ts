import { IProduct } from '@/types/product';
import { getDB } from '../config/mongodb';

export default class Product {
  static getCollection() {
    const collection = getDB().collection<IProduct>('products');
    return collection;
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

    return products;
  }

  static async getProductBySlug(slug: string) {
    const collection = this.getCollection();

    const product = await collection.findOne({ slug });

    return product;
  }
}
