import { useMemo } from "react";
import { useParams } from "react-router-dom";
import allCinemas from "../data/cinemas";
import { useMapContext } from './Map/context';
import { useFilters } from './CinemaList/FilterContext';

const CinemaMarkers = () => {
  const { Marker } = useMapContext();
  const params = useParams();
  const { filters } = useFilters();
  
  const cinemas = useMemo(() => {
    let filtered = allCinemas;

    // Filter by franchise and country if specified in URL
    if (params.franchiseId || params.countryCode) {
      const { franchiseId, countryCode } = params;
      filtered = filtered.filter(cinema => {
        return (
          franchiseId === 'all-cinemas' ||
          cinema.franchise === franchiseId
        ) && cinema.countryCode === countryCode;
      });
    }

    // Apply shared filters
    filtered = filtered.filter(cinema => {
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

    return filtered;
  }, [params, filters]);

  return cinemas.map((cinema) => (
    <Marker 
      lat={cinema.lat} 
      lon={cinema.lng} 
      cinema={cinema}
      key={cinema.name + cinema.lat + cinema.lng}
    />
  ));
};

export default CinemaMarkers;