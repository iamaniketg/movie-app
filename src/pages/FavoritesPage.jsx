import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MovieGrid from '../components/MovieGrid';
import EmptyState from '../components/EmptyState';
import { selectFavorites, clearFavorites } from '../store/favoritesSlice';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';

export default function FavoritesPage() {
  const favorites = useSelector(selectFavorites);
  const dispatch = useDispatch();

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3, flexWrap: 'wrap', gap: 2 }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          ❤️ My Favorites
        </Typography>
        {favorites.length > 0 && (
          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteSweepIcon />}
            onClick={() => dispatch(clearFavorites())}
          >
            Clear All
          </Button>
        )}
      </Box>

      {favorites.length === 0 ? (
        <EmptyState
          title="No favorites yet"
          subtitle="Start adding movies to your favorites by clicking the heart icon on any movie card."
        />
      ) : (
        <MovieGrid movies={favorites} />
      )}
    </Container>
  );
}
