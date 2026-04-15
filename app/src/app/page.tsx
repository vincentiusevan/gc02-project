import Image from 'next/image';
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
            return (
              <div key={product.slug} className="border p-4">
                <Image
                  src={product.thumbnail}
                  alt={product.name}
                  width={300}
                  height={300}
                  className="h-60 w-full object-cover"
                />
                <h3 className="mt-4 font-semibold">{product.name}</h3>
                <p className="mt-2 text-sm text-gray-600">{product.excerpt}</p>
                <p className="mt-2 font-bold">Rp {product.price.toLocaleString('id-ID')}</p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
