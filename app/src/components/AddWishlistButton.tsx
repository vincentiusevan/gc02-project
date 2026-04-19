'use client';

import { useRouter } from 'next/navigation';

interface IProps {
  productId?: string;
}

export default function AddWishlistButton(props: IProps) {
  const router = useRouter();

  const handleAddWishlist = async () => {
    if (!props.productId) {
      alert('Product belum memiliki id');
      return;
    }

    const resp = await fetch('/api/wishlist', {
      method: 'POST',
      body: JSON.stringify({
        productId: props.productId,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await resp.json();

    if (resp.status === 401) {
      alert(data.message);
      router.push('/login');
      return;
    }

    alert(data.message);
  };

  return (
    <button
      onClick={handleAddWishlist}
      className="mt-4 block w-full rounded-md bg-blue-700 px-4 py-3 font-semibold text-white hover:bg-blue-800"
    >
      Add to Wishlist
    </button>
  );
}
