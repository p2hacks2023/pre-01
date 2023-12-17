
import React, { useState } from 'react';
import axios from 'axios';
import '../css/Register.scss'

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
    <form className='register-Form' onSubmit={handleSubmit}>
      <div className='Frame'>
        <label className='regLabel'>Email:</label>
        <input className='regInput'type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div className='Frame'>
        <label className='regLabel'>Password:</label>
        <input className='regInput' type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <div className='Frame'>
        <label className='regLabel'>Username:</label>
        <input className='regInput' type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
      </div>
      <div className='Frame'>
        <button id='regButton' type="submit">Register</button>
      </div>
    </form>
  );
}

export default RegisterForm;