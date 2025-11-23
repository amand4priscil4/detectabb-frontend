import { Box, CircularProgress, Typography } from '@mui/material';

const LoadingSpinner = ({ message = 'Carregando...' }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="200px"
      gap={2}
    >
      <CircularProgress size={50} />
      <Typography variant="body1" color="textSecondary">
        {message}
      </Typography>
    </Box>
  );
};

export default LoadingSpinner;