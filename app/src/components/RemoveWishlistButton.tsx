'use client';

interface IProps {
  productSlug: string;
}

export default function RemoveWishlistButton(props: IProps) {
  const handleRemoveWishlist = () => {
    console.log('remove wishlist', props.productSlug);
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
