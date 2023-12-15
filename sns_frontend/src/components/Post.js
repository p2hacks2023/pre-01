// Post.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../css/Post.scss"

function Post(props) {
    return (
        <div className='post-Frame'>
            <div className="post-Body">
                <li className='post'>
                    {props.content}
                </li>
            </div>
    
            <div className="like-Frame">
                <div className="like-Number">27</div>
            </div>
    
        </div>
      );
}
export default Post;
