// src/components/UserProfile.js

import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

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

  return (
    <div>
      {userProfile ? (
        <div>
          <h1>{userProfile.username}'s Profile</h1>
          <p>Email: {userProfile.email}</p>
          {/* その他のプロフィール情報を表示 */}
          <Link to="/posts">View Posts</Link>
          <button onClick={() => navigate('/post-form')}>投稿する</button>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default UserProfile;
