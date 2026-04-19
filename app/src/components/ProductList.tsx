'use client';

import ProductCard from './ProductCard';
import { IProduct } from '@/types/product';

interface IProps {
  products: IProduct[];
}

export default function ProductList(props: IProps) {
  const { products } = props;

  const handleSearch = () => {
    console.log('search product');
  };

  const handleLoadMore = () => {
    console.log('load more products');
  };

  return (
    <div>
      <div className="mt-6">
        <input
          type="text"
          placeholder="Search product..."
          className="w-full border px-4 py-3"
          onChange={handleSearch}
        />
      </div>

      <div className="mt-6 grid grid-cols-3 gap-6">
        {products.map((product) => {
          return <ProductCard key={product.slug} product={product} />;
        })}
      </div>

      <div className="mt-8 flex justify-center">
        <button onClick={handleLoadMore} className="border px-6 py-3 font-semibold">
          Load more products
        </button>
      </div>
    </div>
  );
}
