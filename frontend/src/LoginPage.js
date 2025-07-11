import React, { useState } from 'react';
import './LoginPage.css';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Login failed');
        return;
      }

      navigate('/');
      localStorage.setItem('user', JSON.stringify(data));

    } catch {
      setError('Error connecting to server');
    }
  };

  return (
    <div className="login-page">
    <header className="top-nav"></header>

    <div className="login-container">
        <div className="login-card">
        <h2>Hello</h2>
        <p>Sign in to your account</p>
        <form className="login-form" onSubmit={handleLogin}>
            <div className="input-wrapper">
                <input
                type="text"
                onKeyDown={(e) => {
                    if (e.key === 'Enter') handleLogin(e);
                }}
                placeholder="Name"
                className="login-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                />
            </div>
            <div className="input-wrapper">
                <input
                type="password"
                onKeyDown={(e) => {
                    if (e.key === 'Enter') handleLogin(e);
                }}
                placeholder="Password"
                className="login-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                />
                </div>
            </form>
            <div className="sign-up-container">
                <a className="sign-up-link" href="/register"><b>Don't have an account? Sign Up</b></a>
            </div>
        {error && <p className="login-error">{error}</p>}
        </div>
    </div>
    </div>
  );
}

export default LoginPage;
