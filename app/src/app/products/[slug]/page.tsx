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
    <div className="grid gap-8 md:grid-cols-2">
      <div className="space-y-4">
        <Image
          src={product.thumbnail}
          alt={product.name}
          width={700}
          height={700}
          className="h-[520px] w-full rounded-md object-cover"
        />

        <div className="grid grid-cols-3 gap-4">
          {product.images.map((image) => {
            return (
              <Image
                key={image}
                src={image}
                alt={product.name}
                width={220}
                height={220}
                className="h-36 w-full rounded-md object-cover"
              />
            );
          })}
        </div>
      </div>

      <div className="rounded-md bg-white p-8">
        <p className="font-bold uppercase tracking-wide text-blue-700">{product.tags.join(' / ')}</p>
        <h1 className="mt-3 text-4xl font-black">{product.name}</h1>
        <p className="mt-5 leading-8 text-neutral-600">{product.description}</p>
        <p className="mt-6 text-3xl font-black">Rp {product.price.toLocaleString('id-ID')}</p>

        <AddWishlistButton productId={product._id} />
      </div>
    </div>
  );
}
