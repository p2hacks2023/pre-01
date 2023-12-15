//src/components/TimeLine.js
import React, {} from 'react';

import '../css/TimeLine.scss'
import UserProfile from './UserProfile';
import PostList from './PostList';

function TimeLine(props) {
    // const [isButton, setIsButton] = useState(true);
   

    // const handleCloseButtonClick = () => {
    //     setIsShown(false)
    // }

    if (props.Bool) {
        //タイムライン構成
        return (
            <div className='timeline-container'>
                <div className={`popup-menu ${props.TriggerBool ? 'shown' : ''}`}>
                    <UserProfile/>
                    {/* <button onClick={parentIsShowSetter}>
                        Close Menu
                    </button> */}
                    <PostList/>
                </div>
            </div>
        )
    }

}
export default TimeLine;