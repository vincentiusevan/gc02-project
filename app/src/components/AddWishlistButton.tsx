'use client';

interface IProps {
  productSlug: string;
}

export default function AddWishlistButton(props: IProps) {
  const handleAddWishlist = () => {
    console.log('add wishlist', props.productSlug);
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
