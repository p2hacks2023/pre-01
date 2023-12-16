
import React, { useState } from 'react';
import axios from 'axios';

function RegisterForm({ setLoggedIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // ユーザー登録のためのリクエストをサーバーに送信
      const response = await axios.post('http://localhost:3001/register', {
        email,
        password,
        username, 
      });

      // ユーザー登録成功時の処理
      console.log('Registration successful:', response.data);

      // ログイン状態を更新
      setLoggedIn(true);

      // ...（その他の処理）
    } catch (error) {
      console.error('Registration error:', error.response.data);
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
        <label>Username:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
      </div>
      <div>
        <button type="submit">Register</button>
      </div>
    </form>
  );
}

export default RegisterForm;