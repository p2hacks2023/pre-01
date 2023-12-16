// Avatar.js
<<<<<<< Updated upstream
import React, { } from 'react';
=======
import React, {useEffect,useState } from 'react';
import axios from 'axios';
>>>>>>> Stashed changes
import "../css/Avatar.scss"
import Animal from "./Animal.js"
import Post from './Post.js';

<<<<<<< Updated upstream
function Avatar({top,left}) {
=======
function Avatar({top,left,content}) {

>>>>>>> Stashed changes
    const buttonStyle = {
        position: 'absolute',
        top: `${top}px`, // 上部の座標
        left: `${left}px`, // 左部の座標
      };
    return(
        <div className='avatar-Body' style={{ ...buttonStyle }}>
<<<<<<< Updated upstream
            <div className='post-Base'><Post content={'あいうえお'}/></div>
=======
            <div className='post-Base'><Post content={content}/></div>
>>>>>>> Stashed changes
            <div className="animal-Base"><Animal/></div>
        </div>
    );

}
export default Avatar;