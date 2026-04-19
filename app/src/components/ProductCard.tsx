import Image from 'next/image';
import Link from 'next/link';
import { IProduct } from '@/types/product';
import AddWishlistButton from './AddWishlistButton';
import RemoveWishlistButton from './RemoveWishlistButton';

interface IProps {
  product: IProduct;
  showRemoveButton?: boolean;
}

export default function ProductCard(props: IProps) {
  const { product, showRemoveButton } = props;

  return (
    <div className="group overflow-hidden rounded-md border border-neutral-200 bg-white shadow-sm">
      <Link href={`/products/${product.slug}`}>
        <Image
          src={product.thumbnail}
          alt={product.name}
          width={400}
          height={400}
          className="h-64 w-full object-cover group-hover:scale-105"
        />
      </Link>

      <div className="p-5">
        <p className="text-xs font-bold uppercase tracking-wide text-blue-700">{product.tags[0]}</p>
        <h3 className="mt-2 text-lg font-bold">{product.name}</h3>
        <p className="mt-2 min-h-10 text-sm leading-6 text-neutral-600">{product.excerpt}</p>
        <p className="mt-4 text-xl font-black">Rp {product.price.toLocaleString('id-ID')}</p>

        <Link
          href={`/products/${product.slug}`}
          className="mt-4 inline-block font-semibold text-blue-700 underline"
        >
          Detail
        </Link>
        {showRemoveButton ? (
          <RemoveWishlistButton productId={product._id} />
        ) : (
          <AddWishlistButton productId={product._id} />
        )}
      </div>
    </div>
  );
}
