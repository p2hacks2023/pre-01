import React, { useEffect, useState } from 'react';
<<<<<<< Updated upstream
import { useNavigate, Link } from 'react-router-dom';
import testImage from '../images/logo192.png'
=======
import { useNavigate, Link, useParams } from 'react-router-dom';
import axios from 'axios';
import whale from "../images/whale.png"
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
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
=======
  }, [userId]); // userId と token を依存リストに追加

  return (
    <div>
      {userProfile ? (
        <div>
        <div className='timeline-Profile'>
            {/*プロフィール画像*/}
            <div className='profile-Img-Frame'>
              <img src={whale} className="profile-Img" alt="logo" />
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
>>>>>>> Stashed changes
    </div>
  );
};

export default UserProfile;
