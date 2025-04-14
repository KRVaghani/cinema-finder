import { List, Box } from "@mui/material";
import CinemaListItem from './CinemaListItem';
import FilterPanel from './FilterPanel';
import { useFilters } from './FilterContext';
import { useMemo } from 'react';

const CinemaListAside = ({ cinemas, Header = null }) => {
  const { filters } = useFilters();

  const filteredCinemas = useMemo(() => {
    return cinemas.filter(cinema => {
      // Apply distance filter if cinema has distance property
      if (cinema.distance && cinema.distance > filters.maxDistance) {
        return false;
      }

      // Filter by opening hours
      if (filters.showOpenOnly) {
        const now = new Date();
        const currentHour = now.getHours();
        if (cinema.openingHours) {
          if (currentHour < cinema.openingHours.open || currentHour >= cinema.openingHours.close) {
            return false;
          }
        }
      }

      // Filter by accessibility
      if (filters.hasAccessibility && !cinema.hasAccessibility) {
        return false;
      }

      // Filter by parking
      if (filters.hasParking && !cinema.hasParking) {
        return false;
      }

      return true;
    });
  }, [cinemas, filters]);

  return (
    <Box 
      sx={{ 
        position: 'relative',
        height: 'calc(100vh - 112px)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}
    >
      {Header && (
        <Box sx={{ 
          position: 'sticky', 
          top: 0, 
          bgcolor: 'background.paper',
          zIndex: 1,
          borderBottom: 1,
          borderColor: 'divider',
          flexShrink: 0
        }}>
          <Header {...{ cinemas: filteredCinemas }} />
        </Box>
      )}
      <FilterPanel />
      <Box sx={{ 
        flex: 1,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <List sx={{ 
          overflowY: 'auto',
          flex: 1,
          pt: 0
        }}>
          {filteredCinemas.map((cinema) => (
            <CinemaListItem {...cinema} key={cinema.name + cinema.lat + cinema.lng} />
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default CinemaListAside;