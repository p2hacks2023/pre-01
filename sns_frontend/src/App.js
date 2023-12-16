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
<<<<<<< Updated upstream
  const [isShown, setIsShown] = useState(false)
=======
  const [isShown, setIsShown] = useState(false);
  const [isPosted, setIsPosted] = useState(false);
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
      {/*タイムラインコンポーネント用タグ*/}
      <div className='gui-container'>
        <div className="playground-Base">
          <Playground/>
        </div>
        <div className='timeline-Base'>
          <TimeLine Bool={true} TriggerBool={isShown} setIsShown={setIsShown} isLoggedIn={true} />
        </div>
        {/* ログインフォームはログインされていない時のみに表示 */}
        <div className="login-Form-Base">
          <LoginForm/>
        </div>
        {/* ポストフォームはログインされていない時のみに表示 */}
        <div className="post-Form-Base">
          <PostForm/>
        </div>
        <nav className='navmenu'>
          <TimeLine Bool={false} TriggerBool={handleShow} />
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


            {/*ログイン判別機能をコメントアウト*/}
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
          element={<PostForm />}
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
=======
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
>>>>>>> Stashed changes
}

export default App;