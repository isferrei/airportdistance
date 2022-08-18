import { useEffect, useState, useRef } from "react";
import { Box, Stack } from "@mui/material";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import {
  GoogleMap,
  useJsApiLoader,
  Polyline,
  Marker,
} from "@react-google-maps/api";
import * as S from "./styles";

import { AutoComplete } from "../AutoComplete";

const center = {
  lat: 34.139088,
  lng: -20.865974,
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
  const map = useRef(null);

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
      const flightPlanCoordinates = [origin, destination];
      // @ts-ignore
      setDirections(flightPlanCoordinates);
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

  const options = {
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#FF0000",
    fillOpacity: 0.35,
    editable: false,
    visible: true,
    radius: 30000,
    geodesic: true,
    paths: directions,
    focus: true,
    zIndex: 1,
  };

  return (
    <Box position="relative">
      <Stack
        bgcolor="#546586"
        height="fit-content"
        width="100%"
        alignItems="center"
        justifyContent="center"
        position="fixed"
        zIndex="1"
        padding="10px"
      >
        <S.Navbar>
          <Stack
            display="flex"
            flexDirection="row"
            alignItems="center"
            gap="10px"
            height="80px"
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
            height="80px"
          >
            <FlightLandIcon />
            <AutoComplete
              setValue={(value) =>
                setDestination({ lat: value.lat, lng: value.lon })
              }
              label="To"
            />
          </Stack>
        </S.Navbar>
        <Stack>
          <h3>Distance {getDistance()} nmi</h3>
        </Stack>
      </Stack>
      <Box width="100%" height="100vh" position="relative">
        {isLoaded && (
          <GoogleMap
            ref={map}
            mapContainerStyle={{ width: "100%", height: "100vh" }}
            center={center}
            zoom={2.5}
            options={{
              streetViewControl: false,
              mapTypeControl: false,
            }}
          >
            <Marker position={center} />
            {directions && (
              <>
                <Marker position={origin as MapsLocation} />
                <Marker position={destination as MapsLocation} />
              </>
            )}
            {directions && (
              <Polyline visible path={directions} options={options} />
            )}
          </GoogleMap>
        )}
      </Box>
    </Box>
  );
};
