import React, { useState, useEffect } from 'react';
import "../css/Playground.scss"
import axios from 'axios';
import Avatar from './Avatar';
import iceberg from '../images/iceberg.png'

function Playground(refresh) {
  const [posts, setPosts] = useState([]);
  const [userProfile, setUserProfile] = useState(null);
  // const [contentList, setContentList] = useState([]);
  const [contentList,setContentList]= useState([]);
  // const { userId } = useParams();

  useEffect(() => {
    // 投稿を取得するAPI呼び出し
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/posts`);
        // console.log(userId)
        setPosts(response.data.posts);
        for (let index = 0; index < posts.length; index++) {
            contentList[index] = posts[index]['content']
            console.log('content:',contentList[index]);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchPosts();
  }, [refresh]);
  // アバターの位置情報をStateで管理
  const [avatarsPosition, setAvatarsPosition] = useState([
    { top: 10, left: 30 },
    { top: 400, left: 90 },
    { top: 300, left: 1050 },
    { top: 100, left: 700 },
  ]);

 
  // const[postContents,setPostContents]=useState([post]);

  // アバターを動かす関数
  const moveAvatars = () => {
    setAvatarsPosition((prevPositions) => {
      return prevPositions.map((position) => ({
        ...position,
        left: position.left + (Math.random() - 0.5) * 10, // 左右にランダムに移動
      }));
    });
  };

  // アバターを定期的に動かす
  useEffect(() => {
    const interval = setInterval(() => {
      moveAvatars();
    }, 200); // 200ミリ秒ごとに動かす、適宜調整してください

    return () => clearInterval(interval); // コンポーネントがアンマウントされた時にクリアする
  }, []);

  return (
    <div className='playground-Frame'>
      {/* アバターを表示 */}
      <div className="playground-Image-Frame">
        <img src={iceberg} className="playground-Img" alt="logo" />
      </div>
      
      <div className='Avatars-Frame'>
      {/* <h1>Post List</h1> */}
        <ul>
          {avatarsPosition.map((position, index) => (
            <Avatar key={index}content={contentList[contentList.length-index]} top={position.top} left={position.left} />
          ))}
        </ul>
      </div>

    </div>
  );
}

export default Playground;
