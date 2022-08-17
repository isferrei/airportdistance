import { useEffect, useState } from "react";
import { Box, Stack } from "@mui/material";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";

import { AutoComplete } from "../AutoComplete";
import { Map } from "../Map";

export const Form: React.FC = () => {
  const [origin, setOrigin] = useState({ lat: 0, lng: 0 });
  const [destination, setDestination] = useState<MapsLocation>({
    lat: 0,
    lng: 0,
  });

  function getDistance() {
    let p = 0.017453292519943295;
    let NMI = 0.53996;
    let c = Math.cos;
    let a =
      0.5 -
      c((destination?.lat - origin?.lat) * p) / 2 +
      (c(origin?.lat * p) *
        c(destination?.lat * p) *
        (1 - c((destination?.lng - origin?.lng) * p))) /
        2;

    let distance = 12742 * Math.asin(Math.sqrt(a));

    if (destination?.lat && origin?.lat) {
      return (distance * NMI).toFixed(2);
    } else {
      return 0;
    }
  }

  useEffect(() => {
    getDistance();
  }, [origin, destination]);

  return (
    <Stack height="100vh" alignItems="center" justifyContent="center">
      <Box
        height="120px"
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
            setValue={(value) => setOrigin({ lat: value.lat, lng: value.lon })}
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
      <Stack>Distance {getDistance()}nmi</Stack>
      <Map origin={{ lat: origin.lat, lng: origin.lng }} />
    </Stack>
  );
};
