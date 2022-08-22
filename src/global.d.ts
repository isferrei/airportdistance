type Airports = [
  {
    icao: string;
    iata: string;
    name: string;
    shortName: string;
    municipalityName: string;
    location: Location;
    countryCode: string;
  }
];

type Location = {
  lat: number;
  lon: number;
};

type MapsLocation = {
  lat: number;
  lng: number;
};
