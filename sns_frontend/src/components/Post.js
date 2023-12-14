// Post.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../css/Post.scss"

function Post() {
    return (
        <div className='post-Frame'>
            <div className="post-Body">
                <li className='post'>
                    私わたくしはその人を常に先生と呼んでいた。だからここでもただ先生と書くだけで本名は打ち明けない。
                </li>
            </div>
    
            <div className="like-Frame">
                <div className="like-Number">27</div>
            </div>
    
        </div>
      );

}
export default Post;
