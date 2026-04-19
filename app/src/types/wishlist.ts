import { ObjectId } from 'mongodb';

export interface IWishlist {
  userId: ObjectId;
  productId: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
