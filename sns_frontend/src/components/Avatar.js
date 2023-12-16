// Avatar.js
import React, { } from 'react';
import "../css/Avatar.scss"
import Animal from "./Animal.js"
import Post from './Post.js';

function Avatar({top,left}) {
    const buttonStyle = {
        position: 'absolute',
        top: `${top}px`, // 上部の座標
        left: `${left}px`, // 左部の座標
      };
    return(
        <div className='avatar-Body' style={{ ...buttonStyle }}>
            <div className='post-Base'><Post content={'あいうえお'}/></div>
            <div className="animal-Base"><Animal/></div>
        </div>
    );

}
export default Avatar;