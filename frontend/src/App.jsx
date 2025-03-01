import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './pages/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import DetailedVideoPage from './pages/DetailedVideoPage';
import TrendingPage from './pages/TrendingPage';
import HomePage from './pages/HomePage';
import WatchLaterPage from './pages/WatchLaterPage';
import GamingRoute from './pages/GamingPage';
import LandingPage from './pages/LandingPage';
import MultiStepForm from './pages/ MultiStepForm';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route
        path="/complete-step"
        element={
          <ProtectedRoute>
            <MultiStepForm />
          </ProtectedRoute>
        }
      />
      <Route path="/auth" element={<LoginPage />} />
      <Route
        path="/feed"
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
        path="/watch-later"
        element={
          <ProtectedRoute>
            <WatchLaterPage />
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