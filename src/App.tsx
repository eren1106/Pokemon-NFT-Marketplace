import React from 'react';
import Sidebar from './components/Sidebar';
import styles from './App.module.scss';
import Topbar from './components/Topbar';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Collection from './pages/Collection';
import Detail from './pages/Detail';
import Profile from './pages/Profile';

function App() {
  return (
    <div className={styles.App}>
      <Sidebar />
      <div className={styles.right}>
        <Topbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/collections" element={<Collection />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/:pokemonID" element={<Detail />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
