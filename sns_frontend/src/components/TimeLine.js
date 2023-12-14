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
    if(props.Bool){
        return(
            <div className='timeline-container'>
                <div className={`popup-menu ${props.Bool ? 'shown' : ''}`}>
                    <div>menu</div>
                    <button onClick={handleCloseButtonClick}>
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