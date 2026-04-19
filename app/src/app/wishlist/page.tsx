import WishlistList from '@/components/WishlistList';
import { products } from '@/data/product';

export default function WishlistPage() {
  const wishlistProducts = products.slice(0, 2);

  return (
    <div>
      <h1 className="text-3xl font-bold">Wishlist</h1>
      <p className="mt-2 text-gray-600">Produk favorit yang kamu simpan.</p>

      <WishlistList products={wishlistProducts} />
    </div>
  );
}
