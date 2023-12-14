//src/components/TimeLine.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import '../css/TimeLine.scss'

function TimeLine(props) {
    const [isButton, setIsButton] = useState(true);
    const [isShown, setIsShown] = useState(false)
    const handleToggleButtonClick = () => {
        setIsShown(true)
        
    }
    
    const handleCloseButtonClick = () => {
        setIsShown(false)
    }
    const parentIsShowSetter = () => {
        props.setIsShown(false)
    }
    // useEffect(
    //     const handleButtonClick = (props.TriggerBool) => {
    //         setIsShown(TriggerBool)
    //     }
    // );
    // useEffect(() => {
    //     let interval = null;
    //     if (isShown) {
    //         setIsShown(props.TriggerBool)
    //     }
    //   }, [isShown]);

    if(props.Bool){
        //タイムライン構成
        return(
            <div className='timeline-container'>
                <div className={`popup-menu ${props.TriggerBool ? 'shown' : ''}`}>
                        <div className='timeline-Profile'>
                            {/*プロフィール画像*/}
                            <div className='profile-Img-Frame'>
                                <img className='profile-Img'></img>
                            </div>
                            <div className='profile-Right'>
                                {/*名前*/}
                                <div className='profile-Name-Frame'>
                                    <div className='profile-Name'>Tanaka</div>
                                </div>
                                {/*フォローボタン*/}
                                <div className='profile-FollowB-Frame'>
                                    <button className='proprofile-FollowB'>Follow</button>
                                </div>
                            </div>
                        </div>
                        <button onClick={parentIsShowSetter}>
                            Close Menu
                        </button>
                </div>
            </div>
        )
    }
    return(
        <button onClick={handleToggleButtonClick}>
            Toggle Menu
        </button>
    )

}
export default TimeLine;