// PostList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
    <div class >
      <h1>Post List</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            {post.content}
          </li>
        ))}
        {/*テスト用リスト*/ }
        <li>
           テスト用ポスト
        </li>
          
      </ul>
    </div>
  );
};

export default PostList;
