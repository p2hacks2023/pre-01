<<<<<<< Updated upstream
//src/components/TimeLine.js
import React, {} from 'react';

=======
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
>>>>>>> Stashed changes
import '../css/TimeLine.scss'
import UserProfile from './UserProfile';
import PostList from './PostList';

function TimeLine(props) {
<<<<<<< Updated upstream
    // const [isButton, setIsButton] = useState(true);
   

    // const handleCloseButtonClick = () => {
    //     setIsShown(false)
    // }
=======
    const [isButton, setIsButton] = useState(true);
    const [isShown, setIsShown] = useState(false)
    const [loggedIn,setLoggedIn]= useState(true)
    const handleToggleButtonClick = () => {
        setIsShown(true)

    }

    const handleCloseButtonClick = () => {
        setIsShown(false)
    }
    const parentIsShowSetter = () => {
        props.setIsShown(false)
    }
>>>>>>> Stashed changes

    if (props.Bool) {
        //タイムライン構成
        return (
            <div className='timeline-container'>
                <div className={`popup-menu ${props.TriggerBool ? 'shown' : ''}`}>
<<<<<<< Updated upstream
=======
                    <button className="closeButton" onClick={parentIsShowSetter} >Close</button>
>>>>>>> Stashed changes
                    <UserProfile/>
                    {/* <button onClick={parentIsShowSetter}>
                        Close Menu
                    </button> */}
<<<<<<< Updated upstream
                    <PostList/>
=======
                    <PostList isPosted={props.Posted}/>
>>>>>>> Stashed changes
                </div>
            </div>
        )
    }
<<<<<<< Updated upstream
=======
    // return (
    //     <button onClick={handleToggleButtonClick}>
    //         Toggle Menu
    //     </button>
    // )
>>>>>>> Stashed changes

}
export default TimeLine;