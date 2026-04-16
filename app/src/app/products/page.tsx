import ProductCard from '@/components/ProductCard';
import { products } from '@/data/product';

export default function ProductsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Products</h1>
      <p className="mt-2 text-gray-600">Temukan furniture yang cocok untuk rumah kamu.</p>

      <div className="mt-6">
        <input type="text" placeholder="Search product..." className="w-full border px-4 py-3" />
      </div>

      <div className="mt-6 grid grid-cols-3 gap-6">
        {products.map((product) => {
          return <ProductCard key={product.slug} product={product} />;
        })}
      </div>

      <div className="mt-8 flex justify-center">
        <button className="border px-6 py-3 font-semibold">Load more products</button>
      </div>
    </div>
  );
}
