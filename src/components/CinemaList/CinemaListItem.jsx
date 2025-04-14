import { ListItem, ListItemText, IconButton, Box, Chip, Stack } from '@mui/material';
import { MdOutlineLocationOn, MdAccessible, MdLocalParking } from 'react-icons/md';
import { BiTimeFive } from 'react-icons/bi';

const dispatchMapSnapTo = (lat, lng) => {
    // This will dispatch the `map.snapTo` event which will trigger a listener on the
  // respective active map component to zoom to the latitude and longitude passed
  console.log('triggering `map.snapTo` event with args: ', `lat: ${lat}, lng: ${lng}`)
  dispatchEvent(new CustomEvent('map.snapTo', { detail: { lat, lng } }))
}

const CinemaListItem = ({ name, lat, lng, address, phoneNumber, distance, hasAccessibility, hasParking, openingHours }) => {
  const handleClick = () => {
    dispatchEvent(new CustomEvent('map.snapTo', { detail: { lat, lng } }));
  };

  const isOpen = () => {
    if (!openingHours) return null;
    const now = new Date();
    const currentHour = now.getHours();
    return currentHour >= openingHours.open && currentHour < openingHours.close;
  };

  const open = isOpen();

  return (
    <ListItem
      secondaryAction={
        <IconButton edge="end" onClick={handleClick}>
          <MdOutlineLocationOn />
        </IconButton>
      }
    >
      <ListItemText
        primary={name}
        secondary={
          <>
            <Box component="span" display="block">{address}</Box>
            {phoneNumber && (
              <Box component="span" display="block">{phoneNumber}</Box>
            )}
            {distance && (
              <Box component="span" display="block">{distance.toFixed(1)}km away</Box>
            )}
            <Stack direction="row" spacing={1} mt={1}>
              {open !== null && (
                <Chip 
                  icon={<BiTimeFive />} 
                  label={open ? "Open" : "Closed"} 
                  color={open ? "success" : "error"} 
                  size="small"
                />
              )}
              {hasAccessibility && (
                <Chip 
                  icon={<MdAccessible />} 
                  label="Accessible" 
                  size="small" 
                  variant="outlined" 
                />
              )}
              {hasParking && (
                <Chip 
                  icon={<MdLocalParking />} 
                  label="Parking" 
                  size="small" 
                  variant="outlined" 
                />
              )}
            </Stack>
          </>
        }
      />
    </ListItem>
  );
};

export default CinemaListItem;