'use client';

import ProductCard from './ProductCard';
import SearchProduct from './SearchProduct';
import PaginationProduct from './PaginationProduct';
import { IProduct } from '@/types/product';

interface IProps {
  products: IProduct[];
}

export default function ProductList(props: IProps) {
  const { products } = props;

  return (
    <div>
      <SearchProduct />

      <div className="mt-6 grid grid-cols-3 gap-6">
        {products.map((product) => {
          return <ProductCard key={product.slug} product={product} />;
        })}
      </div>

      <PaginationProduct />
    </div>
  );
}
