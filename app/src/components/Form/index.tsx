import { Autocomplete, TextField } from "@mui/material";

export const Form = () => {
  const airports = [{ title: "a" }, { title: "b" }, { title: "c" }];
  return (
    <Autocomplete
      id="free-solo-demo"
      options={airports.map((option) => option.title)}
      renderInput={(params) => <TextField {...params} label="Airport" />}
    />
  );
};
