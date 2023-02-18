import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import styles from './App.module.scss';
import Topbar from './components/Topbar';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Collection from './pages/Collection';
import Detail from './pages/Detail';
import Profile from './pages/Profile';
import MenuIcon from '@mui/icons-material/Menu';

function App() {
  const [isClosed, setIsClosed] = useState<boolean>(false);

  const handleToggle = () => {
    setIsClosed(!isClosed);
  }

  return (
    <div className={styles.App}>
      <Sidebar onToggle={handleToggle} isClosed={isClosed} />
      <div className={`${styles.right} ${!isClosed && styles.shrink}`}>
        <div className={`${!isClosed && styles.blackOverlay}`} />
        <div className={styles.topSidebar}>
          <div
            className={styles.burgerMenu}
            onClick={handleToggle}
          >
            <MenuIcon />
          </div>
          <img
            className={styles.bigLogo}
            src="https://raw.githubusercontent.com/PatrickAlphaC/pokemon-nft/main/img/logo.png"
            alt="pokemon logo"
          />
        </div>
        <Topbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/:id" element={<Detail />} />
          <Route path="/collections" element={<Collection />} />
          <Route path="/collections/:id" element={<Detail />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
