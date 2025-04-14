import { IconButton, Typography, Stack, Chip } from "@mui/material";
import { MdOutlineArrowBack } from 'react-icons/md';
import { Link as RouterLink } from 'react-router-dom';

const NearbyHeader = ({ cinemas }) => {
  return (
    <Stack direction="row" justifyContent="space-between" sx={{ p: 2 }}>
      <IconButton component={RouterLink} to="/">
        <MdOutlineArrowBack />
      </IconButton>
      <Typography sx={{ alignSelf: 'center', flex: 1, textAlign: 'center' }}>
        Nearby Cinemas
      </Typography>
      {cinemas.length > 0 && (
        <Chip label={cinemas.length} />
      )}
    </Stack>
  )
}

export default NearbyHeader;