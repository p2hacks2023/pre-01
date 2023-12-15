// Playground.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
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
            <Avatar/>
        </div>
      );

}
export default Playground;
