import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  Popup
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import useEventListener from "@use-it/event-listener";
import { useSnackbar } from "notistack";
import { countryBounds, totalBounds } from "../../data/bounds";
import MapContext from "./context";
import CinemaPopup from "./CinemaPopup";

// Have to override these url's so that it finds the bundles the correct images
Icon.Default.imagePath =
  "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.3/images/";

const MapController = () => {
  const map = useMap();
  const { countryCode } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  // Handle country changes
  useEffect(() => {
    if (countryCode && countryBounds[countryCode]) {
      const bounds = convertBounds(countryBounds[countryCode]);
      map.fitBounds(bounds, { 
        animate: true, 
        duration: 1,
        padding: [50, 50] 
      });
    }
  }, [countryCode, map]);

  // Handle clicking on cinema markers
  useEventListener("map.snapTo", ({ detail: { lat, lng } }) => {
    try {
      map.setZoom(14);
      map.panTo([lat, lng], { 
        animate: true,
        duration: 1 
      });
    } catch (e) {
      console.error(e);
      enqueueSnackbar("Error navigating to location", { variant: "error" });
    }
  });

  return null;
};

const convertBounds = ([w, s, e, n]) => [
  // Leaflet expects coordinates as [lat, lng]
  [s, w], // Southwest corner
  [n, e]  // Northeast corner
];

const LeafletMarker = ({ lat, lon, cinema }) => {
  const [showPopup, setShowPopup] = useState(false);
  
  return (
    <Marker 
      position={[lat, lon]}
      eventHandlers={{
        click: () => {
          setShowPopup(true);
          dispatchEvent(new CustomEvent('map.snapTo', { detail: { lat, lng: lon } }));
        }
      }}
    >
      {showPopup && cinema && (
        <Popup 
          closeButton={true}
          closeOnClick={false}
          onClose={() => setShowPopup(false)}
          offset={[0, -15]}
        >
          <CinemaPopup cinema={cinema} />
        </Popup>
      )}
    </Marker>
  );
};

const LeafletMap = ({ children }) => {
  const { countryCode } = useParams();
  console.log("render Leaflet map");

  const initialBounds = countryCode && countryBounds[countryCode] 
    ? countryBounds[countryCode] 
    : totalBounds;

  return (
    <>
      <MapContainer
        bounds={convertBounds(initialBounds)}
        style={{ height: "100%", backgroundColor: "#99b3cc" }}
        zoomSnap={0.5}
        zoomDelta={0.5}
        minZoom={5}
        maxZoom={18}
        maxBounds={convertBounds(totalBounds)}
        maxBoundsViscosity={1.0}
        keyboard={false}
        dragging={true}
        scrollWheelZoom={true}
        doubleClickZoom={true}
        boxZoom={false}
        touchZoom={true}
      >
        <MapController />
        <TileLayer
          attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.{ext}"
          subdomains="abcd"
          minZoom={5}
          maxZoom={18}
          ext="png"
        />
        <MapContext.Provider value={{ Marker: LeafletMarker }}>
          {children}
        </MapContext.Provider>
      </MapContainer>
    </>
  );
};
export default LeafletMap;
