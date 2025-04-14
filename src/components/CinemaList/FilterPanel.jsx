import { Box, FormControl, FormControlLabel, FormGroup, FormLabel, Slider, Switch, Typography } from '@mui/material';
import { useFilters } from './FilterContext';

const FilterPanel = () => {
  const { filters, setFilters } = useFilters();

  const handleFilterChange = (key, value) => {
    const newFilters = {
      ...filters,
      [key]: value
    };
    setFilters(newFilters);
  };


  return (
    <Box sx={{ 
      p: 2, 
      borderBottom: 1, 
      borderColor: 'divider',
      flexShrink: 0,
      bgcolor: 'background.paper'
    }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Filters</Typography>
      
      <FormControl component="fieldset" variant="standard" sx={{ width: '100%'}}>
        <FormLabel component="legend">Distance</FormLabel>
        <Slider
          value={filters.maxDistance}
          onChange={(_, value) => handleFilterChange('maxDistance', value)}
          valueLabelDisplay="auto"
          step={5}
          marks
          min={5}
          max={100}
          valueLabelFormat={value => `${value}km`}
          sx={{ mt: 2, mb: 3 }}
        />
      </FormControl>

      <FormControl component="fieldset" variant="standard">
        <FormLabel component="legend">Features</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch 
                checked={filters.showOpenOnly}
                onChange={(e) => handleFilterChange('showOpenOnly', e.target.checked)}
              />
            }
            label="Open now"
          />
          <FormControlLabel
            control={
              <Switch 
                checked={filters.hasAccessibility}
                onChange={(e) => handleFilterChange('hasAccessibility', e.target.checked)}
              />
            }
            label="Wheelchair accessible"
          />
          <FormControlLabel
            control={
              <Switch 
                checked={filters.hasParking}
                onChange={(e) => handleFilterChange('hasParking', e.target.checked)}
              />
            }
            label="Parking available"
          />
        </FormGroup>
      </FormControl>

  
    </Box>
  );
};

export default FilterPanel;