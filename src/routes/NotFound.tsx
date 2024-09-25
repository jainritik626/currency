import React from 'react';
import { Typography } from '@mui/material';

const NotFound: React.FC = () => {
  return (
    <Typography variant="h4" align="center" color="error" sx={{ marginTop: '20px' }}>
      404 - Page Not Found
    </Typography>
  );
};

export default NotFound;
