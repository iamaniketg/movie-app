import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Grid from '@mui/material/Grid';
import SearchBar from '../components/SearchBar';
import MovieGrid from '../components/MovieGrid';
import ErrorMessage from '../components/ErrorMessage';
import {
  fetchFeaturedMovies,
  selectFeaturedCategories,
  selectFeaturedLoading,
  selectFeaturedError,
} from '../store/featuredSlice';
import { FEATURED_CATEGORIES } from '../utils/constants';

function SkeletonGrid() {
  return (
    <Grid container spacing={3}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Grid item key={i} xs={6} sm={4} md={3} lg={2.4}>
          <Skeleton
            variant="rounded"
            height={380}
            sx={{ borderRadius: 3, bgcolor: 'rgba(255,255,255,0.05)' }}
          />
          <Skeleton width="80%" sx={{ mt: 1, bgcolor: 'rgba(255,255,255,0.05)' }} />
          <Skeleton width="40%" sx={{ bgcolor: 'rgba(255,255,255,0.05)' }} />
        </Grid>
      ))}
    </Grid>
  );
}

export default function HomePage() {
  const dispatch = useDispatch();
  const categories = useSelector(selectFeaturedCategories);
  const loading = useSelector(selectFeaturedLoading);
  const error = useSelector(selectFeaturedError);

  useEffect(() => {
    // Only fetch if we haven't already loaded categories and no error is present
    if (categories.length === 0 && !error && !loading) {
      dispatch(fetchFeaturedMovies());
    }
  }, [dispatch, categories.length, error, loading]);


  const handleRetry = () => {
    dispatch(fetchFeaturedMovies());
  };

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          py: { xs: 6, md: 10 },
          textAlign: 'center',
          background:
            'radial-gradient(ellipse at 50% 0%, rgba(229,9,20,0.12) 0%, transparent 60%)',
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h1"
            sx={{
              mb: 2,
              fontSize: { xs: '2rem', md: '3rem' },
              background: 'linear-gradient(135deg, #fff 30%, #f5c518 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Discover Your Favorite Films
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: 4, maxWidth: 520, mx: 'auto' }}
          >
            Search thousands of movies, save your favorites, and explore trending films — all in one place.
          </Typography>
          <SearchBar />
        </Container>
      </Box>

      {/* Featured Categories */}
      <Container maxWidth="xl" sx={{ py: 4, pb: 8 }}>
        {error && <ErrorMessage message={error} onRetry={handleRetry} />}

        {loading ? (
          <>
            {FEATURED_CATEGORIES.slice(0, 3).map((cat) => (
              <Box key={cat.query} sx={{ mb: 5 }}>
                <Skeleton
                  width={200}
                  height={32}
                  sx={{ mb: 2, bgcolor: 'rgba(255,255,255,0.05)' }}
                />
                <SkeletonGrid />
              </Box>
            ))}
          </>
        ) : (
          categories.map((cat) => (
            <Box key={cat.query} sx={{ mb: 5 }}>
              <Typography
                variant="h5"
                sx={{
                  mb: 2.5,
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                {cat.title}
              </Typography>
              <MovieGrid movies={cat.movies} />
            </Box>
          ))
        )}
      </Container>
    </Box>
  );
}
