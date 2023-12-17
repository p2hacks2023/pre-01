import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import UserProfile from './components/UserProfile';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import PostForm from './components/PostForm';
import PostList from './components/PostList';
import TimeLine from './components/TimeLine';
import Playground from './components/Playground';
import Home from './components/Home';

import './css/App.scss'



import axios from 'axios';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

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
          console.log('Already LoggedInned ID:',userProfile['id']);
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
          
          
          <Routes>
            <Route  path='/'
                  element={loggedIn?<Navigate to={'/post-profile/'+ userProfile.id}/>:<Navigate to={'/login'}/>}
            />
            <Route  path={loggedIn?'/post-profile/'+ userProfile.id:'/'}
                  element={<Home userProfile={userProfile}/>}
            />
            <Route  path='/posts'
                  element={<PostList/>}
            />
            <Route  path='/register'
                  element={<RegisterForm/>}
            />
            <Route  path='/login'
                    element={<div className='notLoggedInFrame'><LoginForm setLoggedIn={setLoggedIn}/><RegisterForm/></div>}
            />
            <Route  path='/post-form'
                    element={<PostForm/>}
            />
          </Routes>
          
          

          


        
        </Router>
        );
}

export default App;