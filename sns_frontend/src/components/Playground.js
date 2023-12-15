// Playground.js
import React, {} from 'react';

import "../css/Playground.scss"
import Avatar from './Avatar';
import iceberg from '../images/iceberg.png'

function Playground() {

    

    return (
        <div className='playground-Frame'>
            {/* アバターを呼び出す　四体？ */}
            {/* {氷河画像} */}
            <div className="playground-Image-Frame">
                <img src={iceberg} className="playground-Img" alt="logo" />
            </div>
            <Avatar  top={500} left={100}/>
        </div>
      );

}
export default Playground;
