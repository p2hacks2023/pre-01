import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../css/LoginForm.scss";

function LoginForm({ setLoggedIn}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:3001/login', { email, password });
      console.log('Login response:', response.data);
  
      const responseData = response.data;
  
      if (responseData.token) {
        const token = responseData.token;
        localStorage.setItem('token', token);
        setLoggedIn(true);
         // axios.defaults.headers.common を使用して Authorization ヘッダーを設定し、以降のすべてのリクエストで使用します
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      // ユーザー情報を取得するために secure-endpoint を呼び出す
        const verifiedResponse = await axios.get('http://localhost:3001/secure-endpoint');
      
      // レスポンスからユーザーIDを抽出
        const userId = verifiedResponse.data.user.userId;

        console.log('User ID:', userId);
        // navigate(`/user-profile/${userId}`);
        // navigate(`/user-profile`);
        navigate(`/`);

      } else {
        console.error('Invalid response format:', responseData);
      }
    } catch (error) {
      // エラーレスポンスがあるかどうかを確認
      if (error.response) {
        console.error('Login error:', error.response.data);
      } else {
        console.error('Network error:', error.message);
      }
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