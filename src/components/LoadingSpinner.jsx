import React from 'react';
import { CircularProgress, Paper, Typography } from '@mui/material';

const LoadingSpinner = ({ message = 'Loading...' }) => {
  return (
    <Paper 
      sx={{ 
        p: 3, 
        m: 2, 
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <CircularProgress sx={{ mb: 2 }} />
      <Typography variant="body1">{message}</Typography>
    </Paper>
  );
};

export default LoadingSpinner; 