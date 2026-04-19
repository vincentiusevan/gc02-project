import ProductList from '@/components/ProductList';
import Product from '@/server/models/Product';

export const dynamic = 'force-dynamic';

export default async function ProductsPage() {
  const products = await Product.getProducts();

  return (
    <div>
      <section className="rounded-md bg-white p-8">
        <p className="font-bold uppercase tracking-wide text-blue-700">Shop furniture</p>
        <h1 className="mt-3 text-4xl font-black">Products</h1>
        <p className="mt-3 max-w-2xl text-lg leading-8 text-neutral-600">
          Temukan furniture yang cocok untuk rumah kamu.
        </p>
      </section>

      <ProductList products={products} />
    </div>
  );
}
