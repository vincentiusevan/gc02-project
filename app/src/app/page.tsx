import ProductCard from '@/components/ProductCard';
import Link from 'next/link';
import Product from '@/server/models/Product';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const products = await Product.getProducts();

  return (
    <div className="space-y-10">
      <section className="rounded-lg border border-gray-700 bg-zinc-900 px-8 py-12">
        <h1 className="text-4xl font-bold">VKEA Home Living</h1>
        <p className="mt-4 max-w-xl text-gray-400">
          Furniture sederhana untuk membuat rumah terasa lebih nyaman.
        </p>
      </section>

      <section className="grid grid-cols-3 gap-6">
        <div className="border p-4">
          <h2 className="text-xl font-semibold">Belanja furniture lebih mudah</h2>
          <p className="mt-2 text-gray-600">
            Pilih produk kebutuhan rumah dari ruang tamu, kamar tidur, ruang kerja, sampai dekorasi
            ruangan.
          </p>
        </div>

        <div className="border p-4">
          <h2 className="text-xl font-semibold">Desain sederhana dan fungsional</h2>
          <p className="mt-2 text-gray-600">
            Setiap produk dibuat dengan konsep minimalis agar mudah dipadukan dengan berbagai gaya
            rumah.
          </p>
        </div>

        <div className="border p-4">
          <h2 className="text-xl font-semibold">Simpan produk favorit</h2>
          <p className="mt-2 text-gray-600">
            Gunakan wishlist untuk menyimpan produk yang kamu suka sebelum menentukan pilihan.
          </p>
        </div>
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
