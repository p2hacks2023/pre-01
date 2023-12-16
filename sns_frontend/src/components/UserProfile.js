import React, { useEffect, useState } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Penguin from "../images/penguinProto.png"
import '../css/UserProfile.scss'

const UserProfile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const navigate = useNavigate();
  const { userId } = useParams();

  useEffect(() => {
    // プロフィール情報を取得するAPI呼び出し
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/user-profile/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.status === 200 && response.data.userProfile) {
          setUserProfile(response.data.userProfile);
        } else {
          console.error('Error fetching profile:', response.status);
          setUserProfile(null); // エラー時にnullを設定
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        setUserProfile(null); // エラー時にnullを設定
      }
    };

    // UserProfileコンポーネントがマウントされた際にfetchProfileを呼び出す
    fetchProfile();
  }, [userId]); // userId と token を依存リストに追加

  return (
    <div>
      {userProfile ? (
        <div>
        <div className='timeline-Profile'>
            {/*プロフィール画像*/}
            <div className='profile-Img-Frame'>
              <img src={Penguin} className="profile-Img" alt="logo" />
            </div>
            {/*プロフィール右側*/}
            <div className='profile-Right'>
              {/*名前*/}
              <div className='profile-Name-Frame'>
                <div className='profile-Name'>{userProfile.username}</div>
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
                <div className='animalS'>Whale</div>
              </div>
            </div>
          </div>
      </div>
      ) : (
        <p>Error fetching profile. Please try again later.</p>
      )}
    </div>
  );
};

export default UserProfile;
