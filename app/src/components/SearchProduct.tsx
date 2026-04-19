'use client';

interface IProps {
  onSearch: (search: string) => void;
}

export default function SearchProduct(props: IProps) {
  return (
    <div className="mt-8">
      <input
        type="text"
        placeholder="Search product..."
        className="w-full rounded-md border border-neutral-300 bg-white px-5 py-4 text-lg outline-none focus:border-blue-700"
        onChange={(event) => props.onSearch(event.target.value)}
      />
    </div>
  );
}
