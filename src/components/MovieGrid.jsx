import React from 'react';
import Grid from '@mui/material/Grid';
import MovieCard from './MovieCard';

export default function MovieGrid({ movies }) {
  return (
    <Grid container spacing={3}>
      {movies.map((movie) => (
        <Grid item key={movie.imdbID} xs={6} sm={4} md={3} lg={2.4}>
          <MovieCard movie={movie} />
        </Grid>
      ))}
    </Grid>
  );
}
