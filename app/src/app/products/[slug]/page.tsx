import Image from 'next/image';
import { Metadata } from 'next';
import AddWishlistButton from '@/components/AddWishlistButton';
import Product from '@/server/models/Product';

export const dynamic = 'force-dynamic';

interface IProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata(props: IProps): Promise<Metadata> {
  const { slug } = await props.params;
  const product = await Product.getProductBySlug(slug);

  if (!product) {
    return {
      title: 'Product Not Found | VKEA',
      description: 'Product tidak ditemukan.',
    };
  }

  return {
    title: `${product.name} | VKEA`,
    description: product.excerpt,
    openGraph: {
      title: `${product.name} | VKEA`,
      description: product.excerpt,
      images: [product.thumbnail],
    },
  };
}

export default async function ProductDetailPage(props: IProps) {
  const { slug } = await props.params;
  const product = await Product.getProductBySlug(slug);

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

        <AddWishlistButton productId={product._id} />
      </div>
    </div>
  );
}
