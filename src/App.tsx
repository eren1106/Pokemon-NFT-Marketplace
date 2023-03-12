import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Collection from './pages/Collection';
import Detail from './pages/Detail';
import Profile from './pages/Profile';
import Register from './pages/Register';
import Login from './pages/Login';
import Favourites from './pages/Favourites';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recommend/:id" element={<Detail backRoute="/" />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/:id" element={<Detail backRoute="/shop" />} />
        <Route path="/user/:id" element={<Profile />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/collection/:id" element={<Detail backRoute="/collection" />} />
        <Route path="/favourites" element={<Favourites />} />
        <Route path="/favourites/:id" element={<Detail backRoute="/favourites" />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
