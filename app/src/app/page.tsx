import ProductCard from '@/components/ProductCard';
import Image from 'next/image';
import Link from 'next/link';
import Product from '@/server/models/Product';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const products = await Product.getProducts(undefined, '1');
  const featuredProducts = products.slice(0, 6);

  return (
    <div className="space-y-14">
      <section className="grid min-h-[430px] overflow-hidden rounded-md bg-white md:grid-cols-2">
        <div className="flex flex-col justify-center p-10">
          <p className="font-bold uppercase tracking-wide text-blue-700">New everyday comfort</p>
          <h1 className="mt-4 text-5xl font-black leading-tight">VKEA Home Living</h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-neutral-600">
          Furniture sederhana untuk membuat rumah terasa lebih nyaman.
        </p>
          <Link
            href="/products"
            className="mt-8 w-fit rounded-md bg-blue-700 px-6 py-3 font-bold text-white hover:bg-blue-800"
          >
            Belanja sekarang
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 bg-neutral-100 p-3">
          {featuredProducts.slice(0, 4).map((product) => {
            return (
              <Image
                key={product.slug}
                src={product.thumbnail}
                alt={product.name}
                width={400}
                height={400}
                className="h-full min-h-48 w-full rounded-md object-cover"
              />
            );
          })}
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-3">
        <div className="rounded-md border border-neutral-200 bg-white p-6">
          <h2 className="text-xl font-bold">Belanja furniture lebih mudah</h2>
          <p className="mt-3 leading-7 text-neutral-600">
            Pilih produk kebutuhan rumah dari ruang tamu, kamar tidur, ruang kerja, sampai dekorasi
            ruangan.
          </p>
        </div>

        <div className="rounded-md border border-neutral-200 bg-white p-6">
          <h2 className="text-xl font-bold">Desain sederhana dan fungsional</h2>
          <p className="mt-3 leading-7 text-neutral-600">
            Setiap produk dibuat dengan konsep minimalis agar mudah dipadukan dengan berbagai gaya
            rumah.
          </p>
        </div>

        <div className="rounded-md border border-neutral-200 bg-white p-6">
          <h2 className="text-xl font-bold">Simpan produk favorit</h2>
          <p className="mt-3 leading-7 text-neutral-600">
            Gunakan wishlist untuk menyimpan produk yang kamu suka sebelum menentukan pilihan.
          </p>
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-3xl font-black">Featured Products</h2>
          <Link href="/products" className="font-bold text-blue-700 underline">
            See all
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {featuredProducts.map((product) => {
            return <ProductCard key={product.slug} product={product} />;
          })}
        </div>
      </section>
    </div>
  );
}
