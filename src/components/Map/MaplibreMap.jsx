import 'maplibre-gl/dist/maplibre-gl.css';
import Map, { Marker, useMap, Popup } from 'react-map-gl';
import maplibregl from 'maplibre-gl';
import useEventListener from '@use-it/event-listener';
import { useSnackbar } from 'notistack';
import { MapContextProvider } from './context';
import { countryBounds, totalBounds } from '../../data/bounds';
import maplibreglWorker from "maplibre-gl/dist/maplibre-gl-csp-worker";
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CinemaPopup from './CinemaPopup';

maplibregl.workerClass = maplibreglWorker;

const MapController = () => {
  const { enqueueSnackbar } = useSnackbar();
  const map = useMap().current;
  const { countryCode } = useParams();

  // Handle country changes
  useEffect(() => {
    if (countryCode && countryBounds[countryCode]) {
      const bounds = convertBounds(countryBounds[countryCode]);
      map.fitBounds(bounds, { 
        padding: 100, // Increased padding
        duration: 1000,
        essential: true 
      });
    }
  }, [countryCode, map]);

  // Handle clicking on cinema markers
  useEventListener('map.snapTo', ({ detail: { lat, lng } }) => {
    try {
      map.flyTo({
        center: [lng, lat],
        zoom: 12, // Reduced zoom level for better context
        duration: 1000,
        essential: true
      });
    } catch (e) {
      console.error(e);
      enqueueSnackbar('Error navigating to location', { variant: 'error' });
    }
  });

  return null;
};

const MaplibreMarker = ({ lat, lon, cinema }) => {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <>
      <Marker 
        longitude={lon} 
        latitude={lat} 
        anchor="bottom"
        onClick={() => {
          setShowPopup(true);
          dispatchEvent(new CustomEvent('map.snapTo', { detail: { lat, lng: lon } }));
        }}
      />
      {showPopup && cinema && (
        <Popup
          longitude={lon}
          latitude={lat}
          anchor="top"
          onClose={() => setShowPopup(false)}
          closeButton={true}
          closeOnClick={false}
          offset={15}
        >
          <CinemaPopup cinema={cinema} />
        </Popup>
      )}
    </>
  );
}

const convertBounds = ([w, s, e, n]) => ([
  [w, s], [e, n]
]);

const MaplibreMap = ({ children }) => {
  const { countryCode } = useParams();
  
  // Use country-specific bounds if available, otherwise use total bounds
  const initialBounds = countryCode && countryBounds[countryCode] 
    ? countryBounds[countryCode] 
    : totalBounds;

  return (
    <Map
      mapLib={maplibregl}
      mapStyle="https://api.maptiler.com/maps/streets-v2/style.json?key=46DCXvzkGNIvqAgCljGV"
      initialViewState={{
        bounds: convertBounds(initialBounds),
        fitBoundsOptions: {
          padding: 100, // Increased padding for initial view
          duration: 0
        }
      }}
      maxBounds={convertBounds(totalBounds)}
      minZoom={4} // Decreased minimum zoom to allow seeing more context
      maxZoom={18}
      scrollZoom={true}
    >
      <MapController />
      <MapContextProvider value={{ Marker: MaplibreMarker }}>
        {children}
      </MapContextProvider>
    </Map>
  );
};

export default MaplibreMap;
