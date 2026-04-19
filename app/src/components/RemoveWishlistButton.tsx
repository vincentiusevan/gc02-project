'use client';

import { useRouter } from 'next/navigation';

interface IProps {
  productId?: string;
}

export default function RemoveWishlistButton(props: IProps) {
  const router = useRouter();

  const handleRemoveWishlist = async () => {
    if (!props.productId) {
      alert('Product belum memiliki id');
      return;
    }

    const resp = await fetch('/api/wishlist', {
      method: 'DELETE',
      body: JSON.stringify({
        userId: '000000000000000000000001',
        productId: props.productId,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await resp.json();
    alert(data.message);
    router.refresh();
  };

  return (
    <button
      onClick={handleRemoveWishlist}
      className="mt-3 block w-full bg-red-600 px-4 py-2 font-semibold text-white"
    >
      Remove Wishlist
    </button>
  );
}
