// src/components/LoginForm.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginForm({ setLoggedIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/login', { email, password });

      // トークンを取得
      const token = response.data.token;

      // トークンをlocalStorageに保存
      localStorage.setItem('token', token);

      // ログイン成功時の処理
      console.log('Login successful:', response.data);

      // ログイン成功後にプロフィール画面に遷移
      setLoggedIn(true);
      navigate('/user-profile');
    } catch (error) {
      console.error('Login error:', error.response.data);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <div>
        <button type="submit">Login</button>
      </div>
    </form>
  );
}

export default LoginForm;
