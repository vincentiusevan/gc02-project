'use client';

export default function SearchProduct() {
  const handleSearch = () => {
    console.log('search product');
  };

  return (
    <div className="mt-6">
      <input
        type="text"
        placeholder="Search product..."
        className="w-full border px-4 py-3"
        onChange={handleSearch}
      />
    </div>
  );
}
