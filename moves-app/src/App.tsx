import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login, Dashboard, Register, WatchlistsManagment, MovieDetails, WatchlistDetails } from './pages';
import { getToken } from './utils/jwt-token'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Header } from './components';

export const App = () => {
  const isAuthenticated = !!getToken();

  return (
    <>
      <Router>
      <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/watchlists-managment" element={isAuthenticated ? <WatchlistsManagment /> : <Dashboard />} />
          <Route path="/watchlist/:id" element={isAuthenticated ? <WatchlistDetails /> : <Dashboard />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
      </Router>
    </>
  );
};
