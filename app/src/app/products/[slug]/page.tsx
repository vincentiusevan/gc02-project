import Image from 'next/image';
import { products } from '@/data/product';

interface IProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductDetailPage(props: IProps) {
  const { slug } = await props.params;
  const product = products.find((item) => item.slug === slug);

  if (!product) {
    return (
      <div>
        <h1 className="text-3xl font-bold">Product not found</h1>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-8">
      <Image
        src={product.thumbnail}
        alt={product.name}
        width={600}
        height={600}
        className="w-full object-cover"
      />

      <div>
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <p className="mt-4 text-gray-600">{product.description}</p>
        <p className="mt-4 text-2xl font-bold">Rp {product.price.toLocaleString('id-ID')}</p>

        <button className="mt-6 bg-blue-700 px-6 py-3 font-semibold text-white">
          Add to wishlist
        </button>
      </div>
    </div>
  );
}
