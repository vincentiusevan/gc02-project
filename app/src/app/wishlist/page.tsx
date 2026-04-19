import WishlistList from '@/components/WishlistList';
import Wishlist from '@/server/models/Wishlist';

export const dynamic = 'force-dynamic';

const userId = '000000000000000000000001';

export default async function WishlistPage() {
  const wishlistProducts = await Wishlist.getWishlistProducts(userId);

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
