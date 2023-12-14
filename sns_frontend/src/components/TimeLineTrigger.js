//src/components/TimeLineTrigger.js
import React, { useState, useEffect } from 'react';

import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import TimeLine from './TimeLine';
// import '../css/TimeLineTrigger.scss'

function TimeLineTrigger(props) {
    const [isShown, setIsShown] = useState(false)
    const ToggleButtonTrue = () => {
        setIsShown(true)
        this.props.handleToggleButtonClick(isShown);
      }
    
    const handleCloseButtonClick = () => {
        setIsShown(false)
    }
    return(
    <button onClick={ToggleButtonTrue}>
        Toggle Menu
    </button>
    )
    
}
export default TimeLineTrigger;