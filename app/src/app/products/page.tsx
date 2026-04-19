import ProductList from '@/components/ProductList';
import { products } from '@/data/product';

export default function ProductsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Products</h1>
      <p className="mt-2 text-gray-600">Temukan furniture yang cocok untuk rumah kamu.</p>

      <ProductList products={products} />
    </div>
  );
}
