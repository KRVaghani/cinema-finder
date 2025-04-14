import useNearbyCinemas from "../data/nearbyCinemas";
import { useMapContext } from './Map/context';
import { useFilters } from './CinemaList/FilterContext';
import { useMemo } from "react";

const NearbyCinemaMarkers = () => {
  const { Marker } = useMapContext();
  const { cinemas } = useNearbyCinemas();
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

  return filteredCinemas.map((cinema) => (
    <Marker 
      lat={cinema.lat} 
      lon={cinema.lng} 
      cinema={cinema}
      key={cinema.name + cinema.lat + cinema.lng}
    />
  ));
};

export default NearbyCinemaMarkers;