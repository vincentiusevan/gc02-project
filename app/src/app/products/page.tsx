import ProductList from '@/components/ProductList';
import Product from '@/server/models/Product';

export const dynamic = 'force-dynamic';

export default async function ProductsPage() {
  const products = await Product.getProducts();

  return (
    <div>
      <h1 className="text-3xl font-bold">Products</h1>
      <p className="mt-2 text-gray-600">Temukan furniture yang cocok untuk rumah kamu.</p>

      <ProductList products={products} />
    </div>
  );
}
