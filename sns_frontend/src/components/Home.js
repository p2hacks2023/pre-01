// Home.js
import React, {useEffect,useState } from 'react';
import axios from 'axios';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';
import PostForm from './PostForm';
import PostList from './PostList';
import TimeLine from './TimeLine';
import Playground from './Playground';
import "../css/Home.scss"

function Home({props}) {
    const [isShown, setIsShown] = useState(false);
    const [isPosted, setIsPosted] = useState(false);
    const[isRefreshed,setIsRefreshed] = useState(false);
    //タイムライン表示切り替え関数
const handleClose = () => {
    setIsShown(false)
  }
  const handleShow = () => {
    setIsShown(true)
  }
  const toggleRefresh= () => {
    setIsRefreshed(true)
    setIsRefreshed(false)
  }
    return(
        <div className='gui-container'>
            {/*タイムラインコンポーネント用タグ*/}
            {/*ログイン判別機能をコメントアウト*/}
            

            <div>
            <div className="playground-Base">
                <Playground refresh={isRefreshed}/>
            </div>
            <div className='timeline-Base'>
                <TimeLine Bool={true} TriggerBool={isShown} refresh={isRefreshed} setIsShown={setIsShown} isLoggedIn={true} />
            </div>
            
            <div className="post-Form-Base">
                <PostForm setIsPosted={setIsRefreshed}/>
            </div>
            {/* <TimeLine Bool={false} TriggerBool={handleShow} Posted={isPosted}/> */}
            {/*タイムラインコンポーネント表示ボタン*/}
                <button onClick={handleShow} className='OCButton1'>
                My Profile
                </button>
                <button onClick={toggleRefresh} className='OCButton2'>
                Reload
                </button>
             </div>
             </div>
    );

}
export default Home;