'use client';

interface IProps {
  onLoadMore: () => void;
}

export default function PaginationProduct(props: IProps) {
  return (
    <div className="mt-8 flex justify-center">
      <button onClick={props.onLoadMore} className="border px-6 py-3 font-semibold">
        Load more products
      </button>
    </div>
  );
}
