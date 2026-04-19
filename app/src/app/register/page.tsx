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
    <div className="mx-auto max-w-md">
      <h1 className="text-3xl font-bold">Register</h1>
      <p className="mt-2 text-gray-600">Buat akun untuk menyimpan wishlist kamu.</p>

      {error && <p className="mt-4 text-red-500">{error}</p>}

      <form action={register} className="mt-6 space-y-4">
        <div>
          <label className="block font-medium">Name</label>
          <input name="name" className="mt-1 w-full border px-3 py-2" type="text" />
        </div>

        <div>
          <label className="block font-medium">Username</label>
          <input name="username" className="mt-1 w-full border px-3 py-2" type="text" />
        </div>

        <div>
          <label className="block font-medium">Email</label>
          <input name="email" className="mt-1 w-full border px-3 py-2" type="email" />
        </div>

        <div>
          <label className="block font-medium">Password</label>
          <input name="password" className="mt-1 w-full border px-3 py-2" type="password" />
        </div>

        <button className="w-full bg-blue-700 px-4 py-2 font-semibold text-white">Register</button>
      </form>
    </div>
  );
}
