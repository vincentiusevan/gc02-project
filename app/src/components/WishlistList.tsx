'use client';

import ProductCard from './ProductCard';
import { IProduct } from '@/types/product';

interface IProps {
  products: IProduct[];
}

export default function WishlistList(props: IProps) {
  const { products } = props;

  return (
    <div className="mt-6 grid grid-cols-3 gap-6">
      {products.map((product) => {
        return <ProductCard key={product.slug} product={product} showRemoveButton />;
      })}
    </div>
  );
}
