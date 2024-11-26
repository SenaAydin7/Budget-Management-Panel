import { useRouter } from 'next/router';
import { useState } from 'react';

export default function RegisterPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    const user = { username, password };
    localStorage.setItem('user', JSON.stringify(user));
    alert('Kayıt başarılı!');
    router.push('/');
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-kirmizi text-white">
      <h1 className="text-3xl font-bold mb-4">Kayıt Ol</h1>
      <input
        className="mb-2 p-2 rounded bg-white text-black"
        type="text"
        placeholder="Kullanıcı Adı"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="mb-4 p-2 rounded bg-white text-black"
        type="password"
        placeholder="Şifre"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className="bg-bordo p-2 rounded"
        onClick={handleRegister}
      >
        Kayıt Ol
      </button>
    </div>
  );
}
