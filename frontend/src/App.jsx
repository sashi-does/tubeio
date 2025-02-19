import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './pages/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import DetailedVideoPage from './pages/DetailedVideoPage';
import TrendingPage from './pages/TrendingPage';
import HomePage from './pages/HomePage';
import SavedVideosPage from './pages/SavedVIdeosPage';
import GamingRoute from './pages/GamingPage';

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/trending"
        element={
          <ProtectedRoute>
            <TrendingPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/gaming"
        element={
          <ProtectedRoute>
            <GamingRoute />
          </ProtectedRoute>
        }
      />
      <Route
        path="/saved-videos"
        element={
          <ProtectedRoute>
            <SavedVideosPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/videos/:videoId"
        element={
          <ProtectedRoute>
            <DetailedVideoPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;