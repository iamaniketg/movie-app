import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import { alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MovieFilterIcon from '@mui/icons-material/MovieFilter';
import { useSelector } from 'react-redux';
import { selectFavorites } from '../store/favoritesSlice';

export default function Navbar() {
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();
  const favorites = useSelector(selectFavorites);

  const handleSearch = (e) => {
    e.preventDefault();
    const trimmed = searchInput.trim();
    if (trimmed) {
      navigate(`/search?q=${encodeURIComponent(trimmed)}`);
      setSearchInput('');
    }
  };

  return (
    <AppBar position="fixed" elevation={0}>
      <Toolbar sx={{ gap: 2 }}>
        {/* Logo */}
        <Box
          component={RouterLink}
          to="/"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            textDecoration: 'none',
            color: 'inherit',
            flexShrink: 0,
          }}
        >
          <MovieFilterIcon sx={{ color: 'primary.main', fontSize: 32 }} />
          <Typography
            variant="h6"
            sx={{
              fontWeight: 800,
              background: 'linear-gradient(135deg, #e50914, #f5c518)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: { xs: 'none', sm: 'block' },
            }}
          >
            MovieSearch
          </Typography>
        </Box>

        {/* Search Bar */}
        <Box
          component="form"
          onSubmit={handleSearch}
          role="search"
          sx={{
            position: 'relative',
            borderRadius: '12px',
            backgroundColor: (theme) => alpha(theme.palette.common.white, 0.08),
            '&:hover': {
              backgroundColor: (theme) => alpha(theme.palette.common.white, 0.12),
            },
            transition: 'all 0.3s ease',
            ml: 'auto',
            width: { xs: '100%', sm: 'auto' },
            maxWidth: 480,
            flex: 1,
          }}
        >
          <Box
            sx={{
              padding: '0 16px',
              height: '100%',
              position: 'absolute',
              pointerEvents: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <SearchIcon sx={{ color: 'text.secondary' }} />
          </Box>
          <InputBase
            placeholder="Search movies…"
            inputProps={{ 'aria-label': 'search movies' }}
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            sx={{
              color: 'inherit',
              width: '100%',
              '& .MuiInputBase-input': {
                padding: '10px 12px 10px 48px',
                width: '100%',
              },
            }}
          />
        </Box>

        {/* Favorites Link */}
        <IconButton
          component={RouterLink}
          to="/favorites"
          color="inherit"
          aria-label="favorites"
          sx={{
            flexShrink: 0,
            '&:hover': { color: 'primary.main' },
            transition: 'color 0.2s',
          }}
        >
          <Badge
            badgeContent={favorites.length}
            color="primary"
            max={99}
          >
            <FavoriteIcon />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
