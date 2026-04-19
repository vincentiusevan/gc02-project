import { redirect } from 'next/navigation';

interface IProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function LoginPage(props: IProps) {
  const { error } = await props.searchParams;

  async function login(formData: FormData) {
    'use server';

    const email = formData.get('email');
    const password = formData.get('password');

    const resp = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!resp.ok) {
      const data = await resp.json();
      redirect(`/login?error=${data.message}`);
    }

    redirect('/products');
  }

  return (
    <div className="mx-auto max-w-md">
      <h1 className="text-3xl font-bold">Login</h1>
      <p className="mt-2 text-gray-600">Masuk untuk mengelola wishlist kamu.</p>

      {error && <p className="mt-4 text-red-500">{error}</p>}

      <form action={login} className="mt-6 space-y-4">
        <div>
          <label className="block font-medium">Email</label>
          <input name="email" className="mt-1 w-full border px-3 py-2" type="email" />
        </div>

        <div>
          <label className="block font-medium">Password</label>
          <input name="password" className="mt-1 w-full border px-3 py-2" type="password" />
        </div>

        <button className="w-full bg-blue-700 px-4 py-2 font-semibold text-white">Login</button>
      </form>
    </div>
  );
}
