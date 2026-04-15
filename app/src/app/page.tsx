import ProductCard from '@/components/ProductCard';
import Link from 'next/link';
import { products } from '@/data/product';

export default function Home() {
  return (
    <div className="space-y-10">
      <section className="rounded-lg bg-yellow-300 px-8 py-12">
        <h1 className="text-4xl font-bold">VKEA Home Living</h1>
        <p className="mt-4 max-w-xl">
          Furniture sederhana untuk membuat rumah terasa lebih nyaman.
        </p>
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Featured Products</h2>
          <Link href="/products" className="font-medium underline">
            See all
          </Link>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {products.map((product) => {
            return <ProductCard key={product.slug} product={product} />;
          })}
        </div>
      </section>
    </div>
  );
}
