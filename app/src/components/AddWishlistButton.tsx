'use client';

interface IProps {
  productId?: string;
}

export default function AddWishlistButton(props: IProps) {
  const handleAddWishlist = async () => {
    if (!props.productId) {
      alert('Product belum memiliki id');
      return;
    }

    const resp = await fetch('/api/wishlist', {
      method: 'POST',
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
  };

  return (
    <button
      onClick={handleAddWishlist}
      className="mt-3 block w-full bg-blue-700 px-4 py-2 font-semibold text-white"
    >
      Add to Wishlist
    </button>
  );
}
