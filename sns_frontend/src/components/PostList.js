import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import "../css/PostList.scss"
import Post from "./Post.js"
import UserProfile from './UserProfile.js';

const PostList = (props) => {
  const [posts, setPosts] = useState([]);
  const [userProfile, setUserProfile] = useState(null);
  const {useId} = useParams;
  useEffect(() => {
    // プロフィール情報を取得するAPI呼び出し
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/user-profile`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.status === 200 && response.data.userProfile) {
          setUserProfile(response.data.userProfile);
          // setUserId(userProfile.id)
          console.log(userProfile)
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
  }, [props.refresh]); // userId と token を依存リストに追加

  useEffect(() => {
    // 投稿を取得するAPI呼び出し
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/posts`);
        // console.log(userId)
        setPosts(response.data.posts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    // userId を依存リストに追加
    fetchPosts();
  }, [props.refresh]);

  return (
    <div className='postlists-Frame'>
      {/* <h1>Post List</h1> */}
      <ul className='postlists'>
        {posts.map((post) => (
          <li key={post.id}>
            <Post content={post.content} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
