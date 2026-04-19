import WishlistList from '@/components/WishlistList';
import { getUserLogin } from '@/server/helpers/auth';
import Wishlist from '@/server/models/Wishlist';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function WishlistPage() {
  const user = await getUserLogin();

  if (!user) {
    redirect('/login');
  }

  const wishlistProducts = await Wishlist.getWishlistProducts(user._id.toString());

  return (
    <div>
      <section className="rounded-md bg-white p-7 sm:p-8">
        <p className="font-bold uppercase tracking-wide text-blue-700">Saved items</p>
        <h1 className="mt-3 text-3xl font-black sm:text-4xl">Wishlist</h1>
        <p className="mt-3 max-w-2xl text-lg leading-8 text-neutral-600">
          Produk favorit yang kamu simpan.
        </p>
      </section>

      {wishlistProducts.length > 0 ? (
        <WishlistList products={wishlistProducts} />
      ) : (
        <p className="mt-6 text-gray-600">Belum ada produk di wishlist.</p>
      )}
    </div>
  );
}
