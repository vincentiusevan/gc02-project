import ProductCard from '@/components/ProductCard';
import { products } from '@/data/product';

export default function WishlistPage() {
  const wishlistProducts = products.slice(0, 2);

  return (
    <div>
      <h1 className="text-3xl font-bold">Wishlist</h1>
      <p className="mt-2 text-gray-600">Produk favorit yang kamu simpan.</p>

      <div className="mt-6 grid grid-cols-3 gap-6">
        {wishlistProducts.map((product) => {
          return <ProductCard key={product.slug} product={product} />;
        })}
      </div>
    </div>
  );
}
