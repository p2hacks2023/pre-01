// Animal.js
import React, { } from 'react';

import "../css/Animal.scss"
import whale from "../images/whale.png"
import Penguin from "../images/penguinProto.png"

function Animal() {
    return(
        
            <div className="animal-Frame">
                {/* {動物画像取得} */}
                <img src={Penguin} className="animal-Img" alt="logo" />
            </div>
        
    );
}
export default Animal;