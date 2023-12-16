import React, { useState, useEffect } from 'react';
import "../css/Playground.scss"
import Avatar from './Avatar';
import iceberg from '../images/iceberg.png'

function Playground() {
  // アバターの位置情報をStateで管理
  const [avatarsPosition, setAvatarsPosition] = useState([
    { top: 100, left: 50 },
    { top: 100, left: 600 },
    { top: 400, left: 150 },
    { top: 400, left: 800 },
  ]);

  // アバターを動かす関数
  const moveAvatars = () => {
    setAvatarsPosition((prevPositions) => {
      return prevPositions.map((position) => ({
        ...position,
        left: position.left + (Math.random() - 0.5) * 10, // 左右にランダムに移動
      }));
    });
  };

  // アバターを定期的に動かす
  useEffect(() => {
    const interval = setInterval(() => {
      moveAvatars();
    }, 200); // 200ミリ秒ごとに動かす、適宜調整してください

    return () => clearInterval(interval); // コンポーネントがアンマウントされた時にクリアする
  }, []);

  return (
    <div className='playground-Frame'>
      {/* アバターを表示 */}
      <div className="playground-Image-Frame">
        <img src={iceberg} className="playground-Img" alt="logo" />
      </div>
      {avatarsPosition.map((position, index) => (
        <Avatar key={index} top={position.top} left={position.left} />
      ))}
    </div>
  );
}

export default Playground;
