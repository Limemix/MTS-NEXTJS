'use client';
import { useState } from 'react';
import "@/styles/Login.css"
import Cookies from 'js-cookie'

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  const handleLogin = async () => {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      const data = await res.json();
      Cookies.set('token', data.token, { expires: 1 })
      window.location.reload(false)
    } else {
      alert('Некоректний пароль або логін!');
    }
  };

  return (
    
    <div className="login-form">
      <h1 align="center">Авторизація</h1>
      <input
        type="text"
        placeholder="Логін"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Увійти</button>
    </div>
  );
}
