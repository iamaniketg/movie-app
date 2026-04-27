import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';

export default function NotFoundPage() {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '60vh',
          textAlign: 'center',
          gap: 2,
        }}
      >
        <SentimentDissatisfiedIcon
          sx={{ fontSize: 80, color: 'text.secondary', opacity: 0.4 }}
        />
        <Typography
          variant="h1"
          sx={{
            fontWeight: 900,
            fontSize: '6rem',
            background: 'linear-gradient(135deg, #e50914, #f5c518)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          404
        </Typography>
        <Typography variant="h5" color="text.secondary">
          Page not found
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 360 }}>
          The page you're looking for doesn't exist or has been moved.
        </Typography>
        <Button
          component={RouterLink}
          to="/"
          variant="contained"
          color="primary"
          startIcon={<HomeIcon />}
          size="large"
          sx={{ mt: 2 }}
        >
          Go Home
        </Button>
      </Box>
    </Container>
  );
}
