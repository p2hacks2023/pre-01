// Avatar.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../css/Avatar.scss"
import Animal from "./Animal.js"

function Avatar() {
    return(
        <div className='avatar-Body'>
            <div className='post-Base'></div>
            <div className="animal-Base"><Animal/></div>
        </div>
    );

}
export default Avatar;