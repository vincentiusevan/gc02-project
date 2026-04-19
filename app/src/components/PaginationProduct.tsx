'use client';

interface IProps {
  onLoadMore: () => void;
}

export default function PaginationProduct(props: IProps) {
  return (
    <div className="mt-10 flex justify-center">
      <button
        onClick={props.onLoadMore}
        className="rounded-md border border-neutral-900 bg-white px-8 py-3 font-bold hover:bg-neutral-900 hover:text-white"
      >
        Load more products
      </button>
    </div>
  );
}
