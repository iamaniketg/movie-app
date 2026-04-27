import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
import Chip from '@mui/material/Chip';
import MovieGrid from '../components/MovieGrid';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import EmptyState from '../components/EmptyState';
import {
  fetchSearchResults,
  selectSearchMovies,
  selectSearchLoading,
  selectSearchError,
  selectSearchTotalResults,
} from '../store/searchSlice';

export default function SearchResultsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const pageParam = parseInt(searchParams.get('page'), 10) || 1;

  const dispatch = useDispatch();
  const movies = useSelector(selectSearchMovies);
  const loading = useSelector(selectSearchLoading);
  const error = useSelector(selectSearchError);
  const totalResults = useSelector(selectSearchTotalResults);

  const totalPages = Math.min(Math.ceil(totalResults / 10), 100);

  useEffect(() => {
    if (query) {
      dispatch(fetchSearchResults({ query, page: pageParam }));
    }
    window.scrollTo(0, 0);
  }, [query, pageParam, dispatch]);

  const handleRetry = () => {
    dispatch(fetchSearchResults({ query, page: pageParam }));
  };

  const handlePageChange = (_, page) => {
    setSearchParams({ q: query, page: page.toString() });
  };

  if (!query) {
    return (
      <Container maxWidth="xl" sx={{ py: 6 }}>
        <EmptyState
          title="Start searching"
          subtitle="Enter a movie title in the search bar above to find films."
        />
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          Results for "{query}"
        </Typography>
        {totalResults > 0 && (
          <Chip
            label={`${totalResults.toLocaleString()} found`}
            variant="outlined"
            size="small"
            sx={{ borderColor: 'primary.main', color: 'primary.main' }}
          />
        )}
      </Box>

      {loading && <LoadingSpinner message="Searching movies…" />}

      {error && <ErrorMessage message={error} onRetry={handleRetry} />}

      {!loading && !error && movies.length === 0 && (
        <EmptyState
          title={`No movies found for "${query}"`}
          subtitle="Try a different title or check your spelling."
        />
      )}

      {!loading && !error && movies.length > 0 && (
        <>
          <MovieGrid movies={movies} />

          {totalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
              <Pagination
                count={totalPages}
                page={pageParam}
                onChange={handlePageChange}
                color="primary"
                size="large"
                sx={{
                  '& .MuiPaginationItem-root': {
                    color: 'text.secondary',
                    '&.Mui-selected': {
                      bgcolor: 'primary.main',
                      color: '#fff',
                    },
                  },
                }}
              />
            </Box>
          )}
        </>
      )}
    </Container>
  );
}
