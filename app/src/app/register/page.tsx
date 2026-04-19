import { redirect } from 'next/navigation';

interface IProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function RegisterPage(props: IProps) {
  const { error } = await props.searchParams;

  async function register(formData: FormData) {
    'use server';

    const name = formData.get('name');
    const username = formData.get('username');
    const email = formData.get('email');
    const password = formData.get('password');

    const resp = await fetch('http://localhost:3000/api/register', {
      method: 'POST',
      body: JSON.stringify({ name, username, email, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!resp.ok) {
      const data = await resp.json();
      redirect(`/register?error=${data.message}`);
    }

    redirect('/login');
  }

  return (
    <div className="mx-auto max-w-md rounded-md bg-white p-8 shadow-sm">
      <p className="font-bold uppercase tracking-wide text-blue-700">Create account</p>
      <h1 className="mt-3 text-4xl font-black">Register</h1>
      <p className="mt-3 leading-7 text-neutral-600">Buat akun untuk menyimpan wishlist kamu.</p>

      {error && <p className="mt-4 text-red-500">{error}</p>}

      <form action={register} className="mt-6 space-y-4">
        <div>
          <label className="block font-medium">Name</label>
          <input
            name="name"
            className="mt-1 w-full rounded-md border border-neutral-300 px-4 py-3 outline-none focus:border-blue-700"
            type="text"
          />
        </div>

        <div>
          <label className="block font-medium">Username</label>
          <input
            name="username"
            className="mt-1 w-full rounded-md border border-neutral-300 px-4 py-3 outline-none focus:border-blue-700"
            type="text"
          />
        </div>

        <div>
          <label className="block font-medium">Email</label>
          <input
            name="email"
            className="mt-1 w-full rounded-md border border-neutral-300 px-4 py-3 outline-none focus:border-blue-700"
            type="email"
          />
        </div>

        <div>
          <label className="block font-medium">Password</label>
          <input
            name="password"
            className="mt-1 w-full rounded-md border border-neutral-300 px-4 py-3 outline-none focus:border-blue-700"
            type="password"
          />
        </div>

        <button className="w-full rounded-md bg-blue-700 px-4 py-3 font-semibold text-white hover:bg-blue-800">
          Register
        </button>
      </form>
    </div>
  );
}
