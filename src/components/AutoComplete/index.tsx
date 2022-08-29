import { Box, CircularProgress, TextField, Autocomplete } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

export interface AutoCompleteProps {
  setValue: (value: any) => void;
  label: string;
}

export const AutoComplete: React.FC<AutoCompleteProps> = ({
  setValue,
  label,
}) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<Airports[]>([]);
  const loading = open && options.length === 0;

  const url = "https://www.air-port-codes.com/api/v1/multi?term=";

  async function getAirports(value: string) {
    await axios
      .get(url + value, {
        headers: {
          "APC-Auth": "7d329693c5",
        },
      })
      .then((res) => {
        setOptions(res.data.airports);
      });
  }

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      await sleep(1e3); // For demo purposes.
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-evenly"
      width="100%"
    >
      <Autocomplete
        id="asynchronous-demo"
        sx={{ width: 200 }}
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        filterOptions={(x) => x}
        // @ts-ignore
        getOptionLabel={(option) => option.name}
        options={options}
        loading={loading}
        // @ts-ignore
        onChange={(event, value) => setValue(value)}
        renderInput={(params) => (
          <TextField
            {...params}
            InputProps={{
              ...params.InputProps,
              endAdornment: loading && (
                <CircularProgress color="inherit" size={20} />
              ),
            }}
            label={label}
            onChange={(e) => {
              e.target.value.length >= 3 && getAirports(e.target.value);
            }}
          />
        )}
      />
    </Box>
  );
};
