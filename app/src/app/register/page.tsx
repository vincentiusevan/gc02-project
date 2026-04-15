export default function RegisterPage() {
  return (
    <div className="mx-auto max-w-md">
      <h1 className="text-3xl font-bold">Register</h1>
      <p className="mt-2 text-gray-600">Buat akun untuk menyimpan wishlist kamu.</p>

      <form className="mt-6 space-y-4">
        <div>
          <label className="block font-medium">Name</label>
          <input className="mt-1 w-full border px-3 py-2" type="text" />
        </div>

        <div>
          <label className="block font-medium">Username</label>
          <input className="mt-1 w-full border px-3 py-2" type="text" />
        </div>

        <div>
          <label className="block font-medium">Email</label>
          <input className="mt-1 w-full border px-3 py-2" type="email" />
        </div>

        <div>
          <label className="block font-medium">Password</label>
          <input className="mt-1 w-full border px-3 py-2" type="password" />
        </div>

        <button className="w-full bg-blue-700 px-4 py-2 font-semibold text-white">Register</button>
      </form>
    </div>
  );
}
