import { Typography, Box, Link } from '@mui/material';
import { MdCall } from 'react-icons/md';

const CinemaPopup = ({ cinema }) => {
  if (!cinema) return null;
  
  const { name, phoneNumber, address } = cinema;
  
  return (
    <Box sx={{ 
      p: 1, 
      minWidth: 200,
      '& .maplibregl-popup-content': {
        padding: 0
      }
    }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 0.5 }}>
        {name}
      </Typography>
      {address && (
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {address}
        </Typography>
      )}
      {phoneNumber && (
        <Link 
          href={`tel:${phoneNumber}`}
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 1,
            color: 'primary.main',
            textDecoration: 'none',
            '&:hover': {
              textDecoration: 'underline'
            }
          }}
        >
          <MdCall />
          {phoneNumber}
        </Link>
      )}
    </Box>
  );
};

export default CinemaPopup;