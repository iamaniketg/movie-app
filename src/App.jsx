import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Navbar from './components/Navbar';

// Lazy-loaded pages for performance
const HomePage = lazy(() => import('./pages/HomePage'));
const SearchResultsPage = lazy(() => import('./pages/SearchResultsPage'));
const MovieDetailPage = lazy(() => import('./pages/MovieDetailPage'));
const FavoritesPage = lazy(() => import('./pages/FavoritesPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

function PageLoader() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '60vh',
      }}
    >
      <CircularProgress color="primary" size={48} />
    </Box>
  );
}

export default function App() {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <Box component="main" sx={{ flex: 1, pt: { xs: 8, sm: 9 } }}>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchResultsPage />} />
            <Route path="/movie/:id" element={<MovieDetailPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </Box>
    </Box>
  );
}
