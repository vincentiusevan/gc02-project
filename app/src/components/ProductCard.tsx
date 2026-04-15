import Image from 'next/image';
import Link from 'next/link';
import { IProduct } from '@/types/product';

interface IProps {
  product: IProduct;
}

export default function ProductCard(props: IProps) {
  const { product } = props;

  return (
    <div className="border p-4">
      <Image
        src={product.thumbnail}
        alt={product.name}
        width={300}
        height={300}
        className="h-60 w-full object-cover"
      />

      <h3 className="mt-4 font-semibold">{product.name}</h3>
      <p className="mt-2 text-sm text-gray-600">{product.excerpt}</p>
      <p className="mt-2 font-bold">Rp {product.price.toLocaleString('id-ID')}</p>

      <Link href={`/products/${product.slug}`} className="mt-4 inline-block underline">
        Detail
      </Link>
    </div>
  );
}
