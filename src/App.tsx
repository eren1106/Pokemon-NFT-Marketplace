import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Collection from './pages/Collection';
import Detail from './pages/Detail';
import Profile from './pages/Profile';
import Register from './pages/Register';

function App() {
  return (
    <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/:id" element={<Detail />} />
          <Route path="/collections" element={<Collection />} />
          <Route path="/collections/:id" element={<Detail />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/register" element={<Register />} />
        </Routes>
    </div>
  );
}

export default App;
