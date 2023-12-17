import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import '../css/TimeLine.scss'
import UserProfile from './UserProfile';
import PostList from './PostList';

function TimeLine(props) {
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

    if (props.Bool) {
        //タイムライン構成
        return (
            <div className='timeline-container'>
                <div className={`popup-menu ${props.TriggerBool ? 'shown' : ''}`}>
                    <button className="closeButton" onClick={parentIsShowSetter} >Close</button>
                    <UserProfile/>
                    {/* <button onClick={parentIsShowSetter}>
                        Close Menu
                    </button> */}
                    <PostList refresh={props.refresh}/>
                </div>
            </div>
        )
    }
    // return (
    //     <button onClick={handleToggleButtonClick}>
    //         Toggle Menu
    //     </button>
    // )

}
export default TimeLine;