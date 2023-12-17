// Avatar.js
import React, {useEffect,useState } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import axios from 'axios';
import "../css/Avatar.scss"
import Animal from "./Animal.js"
import Post from './Post.js';

function Avatar({top,left,content}) {
    const [userProfile, setUserProfile] = useState(null);
    const [posts, setPosts] = useState([]);
    const { userId } = useParams();

   


    const buttonStyle = {
        position: 'absolute',
        top: `${top}px`, // 上部の座標
        left: `${left}px`, // 左部の座標
      };
    return(
        <div className='avatar-Body' style={{ ...buttonStyle }}>
            <div className='post-Base'><Post content={content}/></div>
            <div className="animal-Base"><Animal/></div>
        </div>
    );

}
export default Avatar;