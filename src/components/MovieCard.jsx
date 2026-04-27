import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useSelector, useDispatch } from 'react-redux';
import { toggleFavorite, selectIsFavorite } from '../store/favoritesSlice';
import { FALLBACK_POSTER } from '../utils/constants';

export default function MovieCard({ movie }) {
  const dispatch = useDispatch();
  const isFav = useSelector(selectIsFavorite(movie.imdbID));

  const posterSrc =
    movie.Poster && movie.Poster !== 'N/A' ? movie.Poster : FALLBACK_POSTER;

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        position: 'relative',
        overflow: 'visible',
      }}
    >
      {/* Favorite button overlay */}
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
          position: 'absolute',
          top: 8,
          right: 8,
          zIndex: 2,
          bgcolor: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(4px)',
          '&:hover': { bgcolor: 'rgba(229, 9, 20, 0.3)' },
          transition: 'all 0.2s',
        }}
        size="small"
      >
        {isFav ? (
          <FavoriteIcon sx={{ color: '#e50914', fontSize: 20 }} />
        ) : (
          <FavoriteBorderIcon sx={{ color: '#fff', fontSize: 20 }} />
        )}
      </IconButton>

      {/* Poster */}
      <Box
        component={RouterLink}
        to={`/movie/${movie.imdbID}`}
        sx={{
          textDecoration: 'none',
          display: 'block',
          overflow: 'hidden',
          borderRadius: '12px 12px 0 0',
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '60px',
            background:
              'linear-gradient(transparent, rgba(19,26,43,0.9))',
          },
        }}
      >
        <CardMedia
          component="img"
          image={posterSrc}
          alt={`${movie.Title} poster`}
          sx={{
            height: 380,
            objectFit: 'cover',
            transition: 'transform 0.4s ease',
            '&:hover': { transform: 'scale(1.05)' },
          }}
        />
      </Box>

      {/* Content */}
      <CardContent sx={{ flex: 1, pt: 1.5 }}>
        <Typography
          variant="subtitle1"
          component={RouterLink}
          to={`/movie/${movie.imdbID}`}
          sx={{
            fontWeight: 700,
            textDecoration: 'none',
            color: 'text.primary',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            '&:hover': { color: 'primary.main' },
            transition: 'color 0.2s',
          }}
        >
          {movie.Title}
        </Typography>
      </CardContent>

      <CardActions sx={{ pt: 0, px: 2, pb: 1.5 }}>
        <Chip
          icon={<CalendarMonthIcon sx={{ fontSize: 16 }} />}
          label={movie.Year}
          variant="outlined"
          size="small"
          sx={{
            borderColor: 'rgba(255,255,255,0.12)',
            color: 'text.secondary',
          }}
        />
      </CardActions>
    </Card>
  );
}
