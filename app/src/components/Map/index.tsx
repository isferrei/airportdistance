import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { Box } from "@mui/material";

const center = {
  lat: 38.714447,
  lng: -99.361144,
};

interface Locations {
  lat: number;
  lng: number;
}

export interface MapProps {
  origin: Locations;
  destination?: Locations;
}

export const Map: React.FC<MapProps> = (origin, destination) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDAlWHoVxmtuL9UHT25_yq7K3BMD9ZJnIY",
    libraries: ["places"],
  });

  const [directions, setDirections] = useState(null);

  console.log("ORIGEMMMMMMM", origin);
  async function calculateRoute() {
    if (origin && destination) {
      // eslint-disable-next-line
      // @ts-ignore

      const directionsService = new google.maps.DirectionsService();
      const results = await directionsService.route({
        origin: { lat: origin?.lat, lng: origin?.lng },
        destination: {
          lat: -34.397,
          lng: 150.644,
        },
        // @ts-ignore
        // eslint-disable-next-line
        travelMode: google.maps.TravelMode.DRIVING,
      });

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      setDirections(results);
    } else {
      return;
    }
  }

  useEffect(() => {
    if (origin && destination) {
      calculateRoute();
    }
  }, [origin, destination]);

  return (
    <Box width="100%" height="100vh">
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "100%" }}
          center={center}
          zoom={5}
          options={{
            streetViewControl: false,
            mapTypeControl: false,
          }}
        >
          {!origin && !destination && <Marker position={center} />}
          {directions && <DirectionsRenderer directions={directions} />}
        </GoogleMap>
      )}
    </Box>
  );
};
