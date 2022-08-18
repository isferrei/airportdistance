import { useEffect, useState } from "react";
import { Box, Stack } from "@mui/material";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  DirectionsRenderer,
} from "@react-google-maps/api";

import { AutoComplete } from "../AutoComplete";

const center = {
  lat: 38.714447,
  lng: -99.361144,
};

export const Form: React.FC = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDAlWHoVxmtuL9UHT25_yq7K3BMD9ZJnIY",
    libraries: ["places"],
  });

  const [origin, setOrigin] = useState<MapsLocation>();
  const [destination, setDestination] = useState<MapsLocation>();
  const [directions, setDirections] = useState(null);

  function getDistance() {
    let p = 0.017453292519943295;
    let NMI = 0.53996;
    let c = Math.cos;

    if (destination?.lat && origin?.lat) {
      let a =
        0.5 -
        c((destination?.lat - origin?.lat) * p) / 2 +
        (c(origin?.lat * p) *
          c(destination?.lat * p) *
          (1 - c((destination?.lng - origin?.lng) * p))) /
          2;

      let distance = 12742 * Math.asin(Math.sqrt(a));

      return (distance * NMI).toFixed(2);
    } else {
      return 0;
    }
  }

  async function calculateRoute() {
    if (origin && destination) {
      // eslint-disable-next-line
      // @ts-ignore
      const directionsService = new google.maps.DirectionsService();
      const results = await directionsService.route({
        origin: origin,
        destination: destination,
        // @ts-ignore
        // eslint-disable-next-line
        travelMode: google.maps.TravelMode.DRIVING,
      });

      // eslint-disable-next-line
      // @ts-ignore
      setDirections(results);
    } else {
      return;
    }
  }

  useEffect(() => {
    if (origin && destination) {
      getDistance();
      calculateRoute();
    }
  }, [origin, destination, calculateRoute, getDistance]);

  return (
    <Box position="relative">
      <Stack
        bgcolor="#546586"
        height="150px"
        width="100%"
        alignItems="center"
        justifyContent="center"
        position="fixed"
        zIndex="1"
        padding="10px"
      >
        <Box
          height="50px"
          display="flex"
          width="100%"
          justifyContent="space-evenly"
        >
          <Stack
            display="flex"
            flexDirection="row"
            alignItems="center"
            gap="10px"
          >
            <FlightTakeoffIcon />
            <AutoComplete
              setValue={(value) =>
                setOrigin({ lat: value.lat, lng: value.lon })
              }
              label="From"
            />
          </Stack>
          <Stack
            display="flex"
            flexDirection="row"
            alignItems="center"
            gap="10px"
          >
            <FlightLandIcon />
            <AutoComplete
              setValue={(value) =>
                setDestination({ lat: value.lat, lng: value.lon })
              }
              label="To"
            />
          </Stack>
        </Box>
        <Stack>
          <h3>Distance {getDistance()} nmi</h3>
        </Stack>
      </Stack>
      <Box width="100%" height="100vh" position="relative">
        {isLoaded && (
          <GoogleMap
            mapContainerStyle={{ width: "100%", height: "100vh" }}
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
    </Box>
  );
};
