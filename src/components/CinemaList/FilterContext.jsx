import { createContext, useContext, useState } from 'react';

const FilterContext = createContext(null);

export const FilterProvider = ({ children }) => {
  const [filters, setFilters] = useState({
    showOpenOnly: false,
    maxDistance: 50,
    hasAccessibility: false,
    hasParking: false
  });

  return (
    <FilterContext.Provider value={{ filters, setFilters }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilters = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilters must be used within a FilterProvider');
  }
  return context;
};

export default FilterContext;