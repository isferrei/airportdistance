import { useEffect, useState, useRef } from "react";
import { Box, Stack, TextField } from "@mui/material";
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
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDAlWHoVxmtuL9UHT25_yq7K3BMD9ZJnIY",
    libraries: ["places"],
  });

  const [origin, setOrigin] = useState<MapsLocation>();
  const [destination, setDestination] = useState<MapsLocation>();
  const [directions, setDirections] = useState(null);

  let isMobile =
    typeof window !== "undefined" &&
    window.matchMedia("(max-width: 764px)").matches;

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
  }, [origin, destination]);

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
    <Box position="relative" width="100vw" height="100vh" padding="10px 0">
      <Box width="100vw" height="100%" position="absolute" left={0} top={0}>
        {isLoaded && (
          <GoogleMap
            mapContainerStyle={{ width: "100%", height: "100vh" }}
            center={center}
            zoom={isMobile ? 2 : 2.5}
            options={{
              streetViewControl: false,
              mapTypeControl: false,
            }}
          >
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
      <S.Container
        bgcolor="#546586"
        display="flex"
        flexDirection="column"
        width="max-content"
        alignItems="center"
        justifyContent="center"
        zIndex="1"
        padding="20px"
        margin="auto"
        borderRadius="15px"
        position="inherit"
        boxShadow="5"
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
                setOrigin({
                  lat: Number(value.latitude),
                  lng: Number(value.longitude),
                })
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
                setDestination({
                  lat: Number(value.latitude),
                  lng: Number(value.longitude),
                })
              }
              label="To"
            />
          </Stack>
        </S.Navbar>
        <Stack>
          <h3>Distance {getDistance()} nmi</h3>
        </Stack>
      </S.Container>
    </Box>
  );
};
