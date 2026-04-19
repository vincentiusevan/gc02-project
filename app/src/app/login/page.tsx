'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState('');

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get('email');
    const password = formData.get('password');

    const resp = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await resp.json();

    if (!resp.ok) {
      setError(data.message);
      return;
    }

    router.push('/products');
    router.refresh();
  };

  return (
    <div className="mx-auto max-w-md">
      <h1 className="text-3xl font-bold">Login</h1>
      <p className="mt-2 text-gray-600">Masuk untuk mengelola wishlist kamu.</p>

      {error && <p className="mt-4 text-red-500">{error}</p>}

      <form onSubmit={handleLogin} className="mt-6 space-y-4">
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
