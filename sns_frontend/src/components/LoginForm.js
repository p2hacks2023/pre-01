// src/components/LoginForm.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../css/LoginForm.scss"

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
    <form className= 'loginForm-Frame' onSubmit={handleSubmit}>
      <div className='email-Form-Frame'>
        <div className="label-Frame">
          <label className='email-Label'>Email</label>
        </div>
        <div className="inputForm-Frame">
          <input type="email" className="email-Form" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
      </div>
      <div className='password-Form-Frame'>
        <div className="label-Frame">
          <label className='password-Label'>Password</label>
        </div>
        <div className="inputForm-Frame">
          <input type="password" className="password-Form" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
      </div>
      <div className='submit-Button-Frame'>
        <button className="submit-Button" type="submit">Login</button>
      </div>
    </form>
  );
}

export default LoginForm;
