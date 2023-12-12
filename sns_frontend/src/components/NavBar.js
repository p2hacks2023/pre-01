// src/components/NavBar.js

import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav>
      <ul>
        {/* 他のリンクを追加 */}
        <li><Link to="/profile/1">My Profile</Link></li>
      </ul>
    </nav>
  );
};

export default NavBar;
