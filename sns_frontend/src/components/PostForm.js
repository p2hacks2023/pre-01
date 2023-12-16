import React, { useState } from 'react';
import axios from 'axios';
import "../css/PostForm.scss"

function PostForm(props) {
  const [postContent, setPostContent] = useState('');
  const IsPostedSetter = () => {
    props.setIsPosted(true)
    props.setIsPosted(false)

}
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');

      if (!token) {
        console.error('User not authenticated. Please log in.');
        return;
      }

      // フォームから取得したデータをサーバーに送信
      const response = await axios.post(
        'http://localhost:3001/post',
        { content: postContent },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('Post successful:', response.data);

      // 成功時にフォームをクリア
      setPostContent('');

      // その他の処理があればここに追加

    } catch (error) {
      console.error('Post error:', error.response.data);
    }
  };

  return (
    <div className="form-Frame">
      <form className="postForm-Frame" onSubmit={handleSubmit}>
        <div className='postContent-Frame'>
          <div className="stick-Frame">
            <textarea rows='2' className="postContent" value={postContent} onChange={(e) => setPostContent(e.target.value)} required />
        </div>
        </div>
        <div className='postSubmit-Frame'>
<<<<<<< Updated upstream
          <button type="submit" className='postSubmit'>Post</button>
=======
          <button type="submit" className='postSubmit' onClick={props.setIsPosted()}>Post</button>
>>>>>>> Stashed changes
        </div>
      </form>
    </div>
  );
}

export default PostForm;