// PostList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../css/PostList.scss"
import Post from "./Post.js"
const PostList = () => {
  const [posts, setPosts] = useState([]);
  
  useEffect(() => {
    // 投稿を取得するAPI呼び出し
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:3001/posts');
        setPosts(response.data.posts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className='postlists-Frame'>
      {/* <h1>Post List</h1> */}
      <ul className='postlists'>
        {posts.map((post) => (
          <li key={post.id}>
            
            <Post key={post.id} content={post.content}/>
          </li>
        ))}
        {/*テスト用リスト*/ }
      </ul>
    </div>
  );
};

export default PostList;
