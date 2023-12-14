// src/App.js

import React, { useState, useEffect ,useRef} from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import UserProfile from './components/UserProfile';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import PostForm from './components/PostForm';
import PostList from './components/PostList';
import TimeLine from './components/TimeLine';
import TimeLineTrigger from './components/TimeLineTrigger';

import './css/App.scss'



import axios from 'axios';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [isShown, setIsShown] = useState(false)
  //タイムライン外クリック時用変数
  const onClickBackground = () => {
    handleShow();
  };

  // 枠内クリック
  // const onClickCard = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
  //   e.stopPropagation();
  // };

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
      {/*タイムラインコンポーネント用タグ*/}
      <div className='gui-container'>
        <div className='timeline-Base'>
          <TimeLine Bool={true} TriggerBool={isShown} setIsShown={setIsShown}/>
        </div>
        <nav className='navmenu'>
          <TimeLine Bool={false}  TriggerBool={handleShow}/>
          {/*タイムラインコンポーネント表示ボタン*/}
          <button onClick={handleShow}>open</button>
          <button onClick={handleClose}>close</button>

          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
                  <Link to="/profile">Profile</Link>
                </li>
                <li>
                  <Link to="/post">Post</Link>
                </li>
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
                

            
            {/* {loggedIn ? (
              <>
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
                <li>
                  <Link to="/post">Post</Link>
                </li>
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/register">Register</Link>
                </li>
                <li>
                  <Link to="/login">Login</Link>
                </li>
              </>
            )} */}
          </ul>
        </nav>
      </div>
      
      <Routes>
        <Route
          path="/"
          element={<div>{loggedIn ? 'Welcome to the app!' : 'Home Page'}</div>}
        />
        <Route
          path="/register"
          element={<RegisterForm />}
        />
        <Route
          path="/login"
          element={<LoginForm setLoggedIn={setLoggedIn} />}
        />
        <Route
          path="/user-profile"
          element={loggedIn ? <UserProfile userProfile={userProfile} /> : <Navigate to="/login" />}
        />
        <Route
          path="/post"
          //ログインせずともフォーム表示するように変更
          // element={loggedIn ? <PostForm /> : <Navigate to="/login" />}
          element={<PostForm/>}
        />
        <Route
          path="/post-form"
          element={<PostForm />}  
        />
        <Route
        path="/posts"
        element={<PostList />}
        />
      </Routes>
    </Router>
    
  );
}

export default App;
