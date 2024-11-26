import { createContext, useState, useEffect } from 'react';
import '../styles/globals.css'; // Tailwind ve diğer global stiller burada

// Kullanıcı durumu için bir Context oluşturuyoruz
export const AuthContext = createContext();

export default function App({ Component, pageProps }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Uygulama başladığında giriş durumunu kontrol et
  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn');
    setIsLoggedIn(loggedInStatus === 'true');
  }, []);

  // Giriş durumunu güncelleme fonksiyonu
  const login = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      <Component {...pageProps} />
    </AuthContext.Provider>
  );
}
