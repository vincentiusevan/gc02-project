'use client';

interface IProps {
  onSearch: (search: string) => void;
}

export default function SearchProduct(props: IProps) {
  return (
    <div className="mt-6">
      <input
        type="text"
        placeholder="Search product..."
        className="w-full border px-4 py-3"
        onChange={(event) => props.onSearch(event.target.value)}
      />
    </div>
  );
}
