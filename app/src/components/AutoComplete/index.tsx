import { useEffect, useState } from "react";
import { TextField, Autocomplete, CircularProgress, Box } from "@mui/material";
import axios from "axios";
import { api } from "../../services/api";

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

  const url =
    "https://aerodatabox.p.rapidapi.com/airports/search/term?limit=10&q=";
  const key = "5a4f29f7c5mshf05a11c02c835b8p1c47a3jsnc8898d976ea1";

  async function getAirports(value: string) {
    try {
      const { data } = await axios.get(url + value, {
        headers: {
          "X-RapidAPI-Key": key,
          "X-RapidAPI-Host": "aerodatabox.p.rapidapi.com",
        },
      });
      setOptions(data.items);
    } catch (error: any) {
      console.error(error);
    }
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
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="space-evenly"
    >
      <Autocomplete
        id="asynchronous-demo"
        sx={{ width: 300 }}
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
        onChange={(event, value) => setValue(value?.location)}
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
            onChange={(e) => getAirports(e.target.value)}
          />
        )}
      />
    </Box>
  );
};
