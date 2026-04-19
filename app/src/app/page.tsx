import ProductCard from '@/components/ProductCard';
import Image from 'next/image';
import Link from 'next/link';
import Product from '@/server/models/Product';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const products = await Product.getProducts(undefined, '1');
  const featuredProducts = products.slice(0, 6);
  const inspirationProducts = products.slice(6, 10);

  return (
    <div className="space-y-16">
      <section className="grid overflow-hidden rounded-md bg-white lg:min-h-[560px] lg:grid-cols-[1fr_1.15fr]">
        <div className="flex flex-col justify-end p-7 sm:p-10 lg:p-14">
          <p className="font-black uppercase tracking-wide text-blue-700">New everyday comfort</p>
          <h1 className="mt-4 text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
            Buat rumah terasa lebih hidup
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-neutral-600 sm:text-xl sm:leading-9">
            Furniture sederhana untuk ruang keluarga, kamar, dan area kerja yang nyaman dipakai
            setiap hari.
          </p>
          <Link
            href="/products"
            className="mt-8 w-fit rounded-md bg-blue-700 px-7 py-4 font-bold text-white hover:bg-blue-800"
          >
            Belanja sekarang
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 bg-neutral-100 p-3 sm:gap-4 sm:p-4">
          {featuredProducts.slice(0, 4).map((product) => {
            return (
              <Image
                key={product.slug}
                src={product.thumbnail}
                alt={product.name}
                width={400}
                height={400}
                className="h-full min-h-44 w-full rounded-md object-cover sm:min-h-64"
              />
            );
          })}
        </div>
      </section>

      <section className="rounded-md bg-[#ffdb00] p-7 md:flex md:items-center md:justify-between">
        <div>
          <p className="font-black uppercase tracking-wide text-blue-800">VKEA Ideas</p>
          <h2 className="mt-2 text-2xl font-black sm:text-3xl">Mulai dari satu sudut yang nyaman.</h2>
          <p className="mt-3 max-w-2xl leading-7 text-neutral-700">
            Pilih meja kerja, kursi santai, rak, atau lampu untuk menyusun ruangan yang lebih rapi.
          </p>
        </div>
        <Link
          href="/products"
          className="mt-6 inline-block rounded-md bg-neutral-950 px-6 py-3 font-bold text-white hover:bg-blue-800 md:mt-0"
        >
          Jelajahi produk
        </Link>
      </section>

      <section>
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-black uppercase tracking-wide text-blue-700">Inspirasi ruangan</p>
            <h2 className="mt-2 text-3xl font-black sm:text-4xl">Belanja berdasarkan kebutuhan</h2>
          </div>
          <Link href="/products" className="font-bold text-blue-700 underline">
            Lihat semua
          </Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {inspirationProducts.map((product) => {
            return (
              <Link
                key={product.slug}
                href={`/products/${product.slug}`}
                className="group overflow-hidden rounded-md bg-white"
              >
                <Image
                  src={product.thumbnail}
                  alt={product.name}
                  width={360}
                  height={420}
                  className="h-72 w-full object-cover group-hover:scale-105"
                />
                <div className="p-5">
                  <p className="text-sm font-black uppercase tracking-wide text-blue-700">
                    {product.tags[0]}
                  </p>
                  <h3 className="mt-2 text-xl font-black">{product.name}</h3>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section>
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-3xl font-black sm:text-4xl">Featured Products</h2>
          <Link href="/products" className="font-bold text-blue-700 underline">
            See all
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProducts.map((product) => {
            return <ProductCard key={product.slug} product={product} />;
          })}
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-3">
        <div className="rounded-md bg-white p-7">
          <h2 className="text-xl font-black">Belanja furniture lebih mudah</h2>
          <p className="mt-3 leading-7 text-neutral-600">
            Pilih produk kebutuhan rumah dari ruang tamu, kamar tidur, ruang kerja, sampai dekorasi
            ruangan.
          </p>
        </div>

        <div className="rounded-md bg-white p-7">
          <h2 className="text-xl font-black">Desain sederhana dan fungsional</h2>
          <p className="mt-3 leading-7 text-neutral-600">
            Setiap produk dibuat dengan konsep minimalis agar mudah dipadukan dengan berbagai gaya
            rumah.
          </p>
        </div>

        <div className="rounded-md bg-white p-7">
          <h2 className="text-xl font-black">Simpan produk favorit</h2>
          <p className="mt-3 leading-7 text-neutral-600">
            Gunakan wishlist untuk menyimpan produk yang kamu suka sebelum menentukan pilihan.
          </p>
        </div>
      </section>
    </div>
  );
}
