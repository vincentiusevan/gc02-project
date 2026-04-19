'use client';

export default function PaginationProduct() {
  const handleLoadMore = () => {
    console.log('load more products');
  };

  return (
    <div className="mt-8 flex justify-center">
      <button onClick={handleLoadMore} className="border px-6 py-3 font-semibold">
        Load more products
      </button>
    </div>
  );
}
