import React, { useEffect, useState, useRef } from "react";
import Script from "react-load-script";
import { Button, Box } from "@mui/material";

const MapComponent = ({ routeCoordinates, source, destination }) => {
  const [google, setGoogle] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [tracking, setTracking] = useState(false);

  const mapRef = useRef(null);
  const busMarkerRef = useRef(null);
  const routePathRef = useRef(null);

  const handleScriptLoad = () => {
    setGoogle(window.google);
    setLoaded(true);
  };

  useEffect(() => {
    if (google && loaded && routeCoordinates.length > 0) {
      const mapInstance = new google.maps.Map(document.getElementById("map"), {
        center: routeCoordinates[0],
        zoom: 13,
      });

      mapRef.current = mapInstance;

      routePathRef.current = new google.maps.Polyline({
        path: routeCoordinates,
        geodesic: true,
        strokeColor: "#1976d2",
        strokeOpacity: 1.0,
        strokeWeight: 3,
      });
      routePathRef.current.setMap(mapInstance);

      new google.maps.Marker({
        position: routeCoordinates[0],
        map: mapInstance,
        label: "Source",
      });

      new google.maps.Marker({
        position: routeCoordinates[routeCoordinates.length - 1],
        map: mapInstance,
        label: "Destination",
      });

      busMarkerRef.current = new google.maps.Marker({
        position: routeCoordinates[0],
        map: mapInstance,
        icon: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
      });
    }
  }, [google, loaded, routeCoordinates]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (tracking && busMarkerRef.current) {
        const nextIndex = (currentIndex + 1) % routeCoordinates.length;
        setCurrentIndex(nextIndex);
        busMarkerRef.current.setPosition(routeCoordinates[nextIndex]);
        mapRef.current.panTo(routeCoordinates[nextIndex]);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [tracking, currentIndex, routeCoordinates]);

  return (
    <Box sx={{ height: "400px", position: "relative" }}>
      <div id="map" style={{ height: "100%", width: "100%" }} />
      <Button
        variant="outlined"
        onClick={() => setTracking(!tracking)}
        sx={{ position: "absolute", top: 10, left: 10 }}
      >
        {tracking ? "Stop Tracking" : "Start Tracking"}
      </Button>
      <Script
        url={`https://maps.googleapis.com/maps/api/js?AIzaSyACjMyglSyG-mu5YSNthFKyFmS0QGf0Qrc`}
        onLoad={handleScriptLoad}
      />
    </Box>
  );
};

export default MapComponent;
