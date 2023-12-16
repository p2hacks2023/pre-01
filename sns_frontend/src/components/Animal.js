// Animal.js
import React, { } from 'react';

import "../css/Animal.scss"
import whale from "../images/whale.png"

function Animal() {
    return(
        
            <div className="animal-Frame">
                {/* {動物画像取得} */}
                <img src={whale} className="animal-Img" alt="logo" />
            </div>
        
    );
}
export default Animal;