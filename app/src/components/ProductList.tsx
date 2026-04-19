'use client';

import { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import SearchProduct from './SearchProduct';
import PaginationProduct from './PaginationProduct';
import { IProduct } from '@/types/product';

interface IProps {
  products: IProduct[];
}

export default function ProductList(props: IProps) {
  const [products, setProducts] = useState<IProduct[]>(props.products);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    const timeout = setTimeout(async () => {
      const resp = await fetch(`/api/products?search=${search}&page=1`);
      const data: IProduct[] = await resp.json();

      setProducts(data);
      setPage(1);
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [search]);

  const handleLoadMore = async () => {
    const nextPage = page + 1;
    const resp = await fetch(`/api/products?search=${search}&page=${nextPage}`);
    const data: IProduct[] = await resp.json();

    setProducts([...products, ...data]);
    setPage(nextPage);
  };

  return (
    <div>
      <SearchProduct onSearch={setSearch} />

      <div className="mt-6 grid grid-cols-3 gap-6">
        {products.map((product) => {
          return <ProductCard key={product.slug} product={product} />;
        })}
      </div>

      <PaginationProduct onLoadMore={handleLoadMore} />
    </div>
  );
}
