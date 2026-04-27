import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

export default function SearchBar({ initialQuery = '' }) {
  const [query, setQuery] = useState(initialQuery);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed) {
      navigate(`/search?q=${encodeURIComponent(trimmed)}`);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      role="search"
      sx={{
        display: 'flex',
        gap: 1.5,
        width: '100%',
        maxWidth: 640,
        mx: 'auto',
      }}
    >
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search for a movie title…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        inputProps={{ 'aria-label': 'search movies' }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: 'text.secondary' }} />
            </InputAdornment>
          ),
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            backgroundColor: 'rgba(255,255,255,0.04)',
          },
        }}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        size="large"
        sx={{ px: 4, fontWeight: 700 }}
      >
        Search
      </Button>
    </Box>
  );
}
