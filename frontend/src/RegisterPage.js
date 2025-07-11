import React, { useState } from 'react';
import './RegisterPage.css';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [register_date] = useState(new Date());
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    const formattedDate = register_date.toISOString().split('T')[0];

    try {
      const res = await fetch('http://localhost:5000/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, password, register_date: formattedDate, phone }),
      });
      const data = await res.json();

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
            <p>Register your account</p>
            <form className="login-form" onSubmit={handleRegister}>
            <div className="input-wrapper">
                <input
                type="text"
                onKeyDown={(e) => {
                    if (e.key === 'Enter') handleRegister(e);
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
                    if (e.key === 'Enter') handleRegister(e);
                }}
                placeholder="Password"
                className="login-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                />
                </div>
                <div className="input-wrapper">
                <input
                type="text"
                onKeyDown={(e) => {
                    if (e.key === 'Enter') handleRegister(e);
                }}
                placeholder="Phone"
                className="login-input"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                />
          </div>
        </form>
        <div className="sign-up-container">
            <a className="sign-up-link" href="/login"><b>Already have an account? Log in</b></a>
        </div>
        {error && <p className="login-error">{error}</p>}
      </div>
      </div>
    </div>
  );
}

export default RegisterPage;
