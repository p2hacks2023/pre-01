// src/components/UserProfile.js

import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import testImage from '../images/logo192.png'
import '../css/UserProfile.scss'

const UserProfile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // プロフィール情報を取得するAPI呼び出し
    const fetchProfile = async () => {
      try {
        const response = await fetch('http://localhost:3001/user-profile', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserProfile(data.userProfile);
        } else {
          console.error('Error fetching profile:', response.status);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []); // 一度だけ実行
  //ログイン情報なしでプロフィール表示するように変更
  return (
    <div>
      <div className='timeline-Profile'>
          {/*プロフィール画像*/}
          <div className='profile-Img-Frame'>
            <img src={testImage} className="profile-Img" alt="logo" />
            {/* <img className='profile-Img'></img> */}
          </div>
          {/*プロフィール右側*/}
          <div className='profile-Right'>
            {/*名前*/}
            <div className='profile-Name-Frame'>
              <div className='profile-Name'>Tanaka</div>
            </div>
            {/*フォローボタン*/}
            <div className='profile-FollowB-Frame'>
              <button className='profile-FollowB'>Follow</button>
            </div>
            {/*いいね数*/}
            <div className="sweets-frame">
              <div className="sweets-Head">Sweets</div>
              <div className="sweets-Number">89</div>
            </div>
          </div>
          {/*プロフィール下部分*/}
          <div className='profile-Foot'>
            {/*動物種類テキスト*/}
            <div className="animalS-Frame">
              <div className='animalS'>Penguin</div>
            </div>
          </div>
        </div>
    </div>
  );
};

export default UserProfile;
