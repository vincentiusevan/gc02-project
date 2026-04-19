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
  const [hasMore, setHasMore] = useState(props.products.length === 10);

  useEffect(() => {
    const timeout = setTimeout(async () => {
      const resp = await fetch(`/api/products?search=${search}&page=1`);
      const data: IProduct[] = await resp.json();

      setProducts(data);
      setPage(1);
      setHasMore(data.length === 10);
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
    setHasMore(data.length === 10);
  };

  return (
    <div>
      <SearchProduct onSearch={setSearch} />

      {products.length > 0 ? (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => {
            return <ProductCard key={product.slug} product={product} />;
          })}
        </div>
      ) : (
        <div className="mt-8 rounded-md bg-white p-10 text-center">
          <h2 className="text-2xl font-black">Produk tidak ditemukan</h2>
          <p className="mt-3 text-neutral-600">Coba gunakan kata kunci lain untuk mencari produk.</p>
        </div>
      )}

      {hasMore && <PaginationProduct onLoadMore={handleLoadMore} />}
    </div>
  );
}
