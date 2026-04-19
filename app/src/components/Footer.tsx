import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-neutral-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <p className="text-2xl font-black">VKEA</p>
          <p className="mt-4 max-w-sm leading-7 text-neutral-600">
            Furniture sederhana, fungsional, dan nyaman untuk rumah yang dipakai setiap hari.
          </p>
          <Link
            href="/products"
            className="mt-6 inline-block rounded-md bg-blue-700 px-5 py-3 font-bold text-white hover:bg-blue-800"
          >
            Belanja produk
          </Link>
        </div>

        <div>
          <h3 className="font-black">Belanja</h3>
          <div className="mt-4 space-y-3 text-neutral-600">
            <Link href="/products" className="block hover:text-blue-700">
              Semua produk
            </Link>
            <Link href="/products" className="block hover:text-blue-700">
              Ruang tamu
            </Link>
            <Link href="/products" className="block hover:text-blue-700">
              Ruang kerja
            </Link>
            <Link href="/wishlist" className="block hover:text-blue-700">
              Wishlist
            </Link>
          </div>
        </div>

        <div>
          <h3 className="font-black">Bantuan</h3>
          <div className="mt-4 space-y-3 text-neutral-600">
            <p>Cara belanja</p>
            <p>Pengiriman</p>
            <p>Pengembalian</p>
            <p>Kontak kami</p>
          </div>
        </div>

        <div>
          <h3 className="font-black">Akun</h3>
          <div className="mt-4 space-y-3 text-neutral-600">
            <Link href="/login" className="block hover:text-blue-700">
              Login
            </Link>
            <Link href="/register" className="block hover:text-blue-700">
              Register
            </Link>
            <Link href="/wishlist" className="block hover:text-blue-700">
              Produk favorit
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-neutral-200 px-6 py-5">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 text-sm text-neutral-500 md:flex-row md:items-center md:justify-between">
          <p>Copyright 2026 VKEA Home Living.</p>
          <p>Project ecommerce Hacktiv8.</p>
        </div>
      </div>
    </footer>
  );
}
