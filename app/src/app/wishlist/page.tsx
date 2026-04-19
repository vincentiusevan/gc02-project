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
      <h1 className="text-3xl font-bold">Wishlist</h1>
      <p className="mt-2 text-gray-600">Produk favorit yang kamu simpan.</p>

      {wishlistProducts.length > 0 ? (
        <WishlistList products={wishlistProducts} />
      ) : (
        <p className="mt-6 text-gray-600">Belum ada produk di wishlist.</p>
      )}
    </div>
  );
}
