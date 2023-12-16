import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import UserProfile from './components/UserProfile';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import PostForm from './components/PostForm';
import PostList from './components/PostList';
import TimeLine from './components/TimeLine';
import Playground from './components/Playground';

import './css/App.scss'



import axios from 'axios';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [isShown, setIsShown] = useState(false);
  const [isPosted, setIsPosted] = useState(false);

  //タイムライン表示切り替え関数
  const handleClose = () => {
    setIsShown(false)
  }
  const handleShow = () => {
    setIsShown(true)
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('Token:', token);

    if (token) {
      axios.get('http://localhost:3001/user-profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(response => {
          setUserProfile(response.data.userProfile);
          setLoggedIn(true);
        })
        .catch(error => {
          console.error('Error fetching user profile:', error);
        });
    }
  }, []);

  const handleLogout = () => {
    // ログアウト時の処理
    setLoggedIn(false);
    setUserProfile(null);
    localStorage.removeItem('token');
  };

  return (
  
    <Router>
      <div className='gui-container'>
        {/*タイムラインコンポーネント用タグ*/}
        {/*ログイン判別機能をコメントアウト*/}
        {loggedIn ? (

          <div>
          <div className="playground-Base">
              <Playground />
          </div>
          <div className='timeline-Base'>
              <TimeLine Bool={true} TriggerBool={isShown} Posted={isPosted} setIsShown={setIsShown} isLoggedIn={true} />
          </div>
          
          <div className="post-Form-Base">
            <PostForm setIsPosted={setIsPosted}/>
          </div>
          <TimeLine Bool={false} TriggerBool={handleShow} Posted={isPosted}/>
          {/*タイムラインコンポーネント表示ボタン*/}
            <button onClick={handleShow} className='OCButton1'>My Profile</button>
          </div>
        ) : (
          <div className="login-Form-Base">
            <LoginForm setLoggedIn ={setLoggedIn}/>
          </div>
        )}
        </div>
        </Router>
        );
}

export default App;