'use client';

import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/logout', {
      method: 'POST',
    });

    router.push('/login');
    router.refresh();
  };

  return (
    <button onClick={handleLogout} className="cursor-pointer font-semibold hover:text-blue-700">
      Logout
    </button>
  );
}
