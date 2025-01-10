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
    <div className="min-h-screen flex flex-col justify-center items-center bg">
      <h1 className="text-3xl font-bold mb-4 text-log">Kayıt Ol</h1>
      <input
        className="mb-2 p-2 rounded bg-white text-black w-full max-w-md"
        type="text"
        placeholder="Kullanıcı Adı"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="mb-4 p-2 rounded bg-white text-black w-full max-w-md"
        type="password"
        placeholder="Şifre"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className="bg-button p-2 rounded text-white hover:bg-[#d0e9e4] hover:text-teal-950 w-full max-w-md"
        onClick={handleRegister}
      >
        Kayıt Ol
      </button>
    </div>
  );
}
