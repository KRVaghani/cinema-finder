import auCinemas from './auCinemas.json';
import nzCinemas from './nzCinemas.json';
import { countBy } from 'lodash';
import { matchCinemaToFranchise } from './franchises';

const addKeyToObject = (key, value) => {
  return (obj) => ({
    ...obj,
    [key]: value,
  });
};

// Add mock feature data to cinemas
// In a real application, this would come from the backend
const addFeatureData = (cinema) => ({
  ...cinema,
  hasAccessibility: Math.random() > 0.3, // 70% chance of being accessible
  hasParking: Math.random() > 0.2, // 80% chance of having parking
  openingHours: {
    open: 9,
    close: 23,
  },
  
});

// Combine the NZ & Aus data after adding the countryCodes to each cinema object
const cinemas = [
  ...auCinemas.map(addKeyToObject('countryCode', 'au')),
  ...nzCinemas.map(addKeyToObject('countryCode', 'nz'))
].map(cinema => {
  // Match each cinema to a franchise and add to each cinema object
  const franchise = matchCinemaToFranchise(cinema);
  const withFranchise = addKeyToObject('franchise', franchise)(cinema);
  // Add feature data
  return addFeatureData(withFranchise);
});

export const breakdown = countBy(cinemas, 'countryCode');
export default cinemas;