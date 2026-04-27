import React, { useEffect } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Skeleton from '@mui/material/Skeleton';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Rating from '@mui/material/Rating';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import StarIcon from '@mui/icons-material/Star';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { toggleFavorite, selectIsFavorite } from '../store/favoritesSlice';
import {
  fetchMovieDetail,
  clearMovieDetail,
  selectMovieDetail,
  selectMovieDetailLoading,
  selectMovieDetailError,
} from '../store/movieDetailSlice';
import ErrorMessage from '../components/ErrorMessage';
import { FALLBACK_POSTER } from '../utils/constants';

function DetailSkeleton() {
  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={4}>
        <Skeleton
          variant="rounded"
          height={520}
          sx={{ borderRadius: 3, bgcolor: 'rgba(255,255,255,0.05)' }}
        />
      </Grid>
      <Grid item xs={12} md={8}>
        <Skeleton width="60%" height={48} sx={{ bgcolor: 'rgba(255,255,255,0.05)' }} />
        <Skeleton width="40%" height={24} sx={{ mt: 1, bgcolor: 'rgba(255,255,255,0.05)' }} />
        <Skeleton width="100%" height={160} sx={{ mt: 3, bgcolor: 'rgba(255,255,255,0.05)' }} />
      </Grid>
    </Grid>
  );
}

function InfoRow({ icon, label, value }) {
  if (!value || value === 'N/A') return null;
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, py: 0.5 }}>
      {icon}
      <Typography variant="body2" color="text.secondary" sx={{ minWidth: 80 }}>
        {label}
      </Typography>
      <Typography variant="body2">{value}</Typography>
    </Box>
  );
}

export default function MovieDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const movie = useSelector(selectMovieDetail);
  const loading = useSelector(selectMovieDetailLoading);
  const error = useSelector(selectMovieDetailError);
  const isFav = useSelector(selectIsFavorite(id));

  useEffect(() => {
    dispatch(fetchMovieDetail(id));
    window.scrollTo(0, 0);

    return () => {
      dispatch(clearMovieDetail());
    };
  }, [id, dispatch]);

  const handleRetry = () => {
    dispatch(fetchMovieDetail(id));
  };

  const imdbRating = movie?.imdbRating && movie.imdbRating !== 'N/A'
    ? parseFloat(movie.imdbRating)
    : null;

  const posterSrc =
    movie?.Poster && movie.Poster !== 'N/A' ? movie.Poster : FALLBACK_POSTER;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Back button */}
      <Button
        component={RouterLink}
        to="/"
        startIcon={<ArrowBackIcon />}
        sx={{ mb: 3, color: 'text.secondary' }}
      >
        Back
      </Button>

      {loading && <DetailSkeleton />}

      {error && <ErrorMessage message={error} onRetry={handleRetry} />}

      {!loading && !error && movie && (
        <Grid container spacing={4}>
          {/* Poster */}
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                borderRadius: 3,
                overflow: 'hidden',
                boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                position: 'relative',
              }}
            >
              <Box
                component="img"
                src={posterSrc}
                alt={`${movie.Title} poster`}
                sx={{
                  width: '100%',
                  display: 'block',
                  minHeight: 400,
                  objectFit: 'cover',
                }}
              />
            </Box>
          </Grid>

          {/* Details */}
          <Grid item xs={12} md={8}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2 }}>
              <Typography variant="h3" component="h1" sx={{ flex: 1 }}>
                {movie.Title}
              </Typography>
              <IconButton
                aria-label={isFav ? 'remove from favorites' : 'add to favorites'}
                onClick={() =>
                  dispatch(
                    toggleFavorite({
                      imdbID: movie.imdbID,
                      Title: movie.Title,
                      Year: movie.Year,
                      Poster: movie.Poster,
                    })
                  )
                }
                sx={{
                  bgcolor: isFav ? 'rgba(229,9,20,0.15)' : 'rgba(255,255,255,0.06)',
                  '&:hover': { bgcolor: 'rgba(229,9,20,0.3)' },
                }}
              >
                {isFav ? (
                  <FavoriteIcon sx={{ color: '#e50914' }} />
                ) : (
                  <FavoriteBorderIcon />
                )}
              </IconButton>
            </Box>

            {/* Genres */}
            {movie.Genre && movie.Genre !== 'N/A' && (
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                {movie.Genre.split(',').map((g) => (
                  <Chip
                    key={g.trim()}
                    label={g.trim()}
                    size="small"
                    sx={{
                      bgcolor: 'rgba(229,9,20,0.12)',
                      color: 'primary.light',
                      fontWeight: 600,
                    }}
                  />
                ))}
              </Box>
            )}

            {/* Rating */}
            {imdbRating !== null && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                <StarIcon sx={{ color: 'secondary.main' }} />
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                  {imdbRating}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  / 10
                </Typography>
                <Rating
                  value={imdbRating / 2}
                  precision={0.1}
                  readOnly
                  size="small"
                  sx={{ ml: 1 }}
                />
                {movie.imdbVotes && movie.imdbVotes !== 'N/A' && (
                  <Typography variant="body2" color="text.secondary">
                    ({movie.imdbVotes} votes)
                  </Typography>
                )}
              </Box>
            )}

            <Divider sx={{ my: 2, borderColor: 'rgba(255,255,255,0.06)' }} />

            {/* Plot */}
            {movie.Plot && movie.Plot !== 'N/A' && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  Plot
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                  {movie.Plot}
                </Typography>
              </Box>
            )}

            {/* Info rows */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
              <InfoRow
                icon={<CalendarMonthIcon sx={{ fontSize: 20, color: 'text.secondary' }} />}
                label="Released"
                value={movie.Released}
              />
              <InfoRow
                icon={<AccessTimeIcon sx={{ fontSize: 20, color: 'text.secondary' }} />}
                label="Runtime"
                value={movie.Runtime}
              />
              <InfoRow
                icon={<StarIcon sx={{ fontSize: 20, color: 'text.secondary' }} />}
                label="Director"
                value={movie.Director}
              />
              <InfoRow
                icon={<StarIcon sx={{ fontSize: 20, color: 'text.secondary' }} />}
                label="Actors"
                value={movie.Actors}
              />
              <InfoRow
                icon={<StarIcon sx={{ fontSize: 20, color: 'text.secondary' }} />}
                label="Language"
                value={movie.Language}
              />
              <InfoRow
                icon={<StarIcon sx={{ fontSize: 20, color: 'text.secondary' }} />}
                label="Country"
                value={movie.Country}
              />
              <InfoRow
                icon={<StarIcon sx={{ fontSize: 20, color: 'text.secondary' }} />}
                label="Awards"
                value={movie.Awards}
              />
              {movie.BoxOffice && movie.BoxOffice !== 'N/A' && (
                <InfoRow
                  icon={<StarIcon sx={{ fontSize: 20, color: 'secondary.main' }} />}
                  label="Box Office"
                  value={movie.BoxOffice}
                />
              )}
            </Box>
          </Grid>
        </Grid>
      )}
    </Container>
  );
}
