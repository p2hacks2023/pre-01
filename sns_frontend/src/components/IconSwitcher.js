import React, { useState } from 'react';

const IconSwitcher = () => {
  const [showOptions, setShowOptions] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState('logo192.png'); // デフォルトのアイコン

  const availableIcons = ['logo192.png', 'whale.png']; // 利用可能なアイコンのリスト

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const selectIcon = (icon) => {
    setSelectedIcon(icon);
    setShowOptions(false); // アイコンが選択されたら候補リストを閉じる
  };

  return (
    <div>
      <img
        src={selectedIcon}
        alt="Selected Icon"
        onClick={toggleOptions}
        style={{ cursor: 'pointer' }}
      />
      {showOptions && (
        <div>
          {availableIcons.map((icon, index) => (
            <img
              key={index}
              src={icon}
              alt={`Icon ${index + 1}`}
              onClick={() => selectIcon(icon)}
              style={{ cursor: 'pointer' }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default IconSwitcher;