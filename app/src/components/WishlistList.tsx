'use client';

import ProductCard from './ProductCard';
import { IProduct } from '@/types/product';

interface IProps {
  products: IProduct[];
}

export default function WishlistList(props: IProps) {
  const { products } = props;

  return (
    <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => {
        return <ProductCard key={product.slug} product={product} showRemoveButton />;
      })}
    </div>
  );
}
