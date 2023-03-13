import React from "react";
import { useSearchParams } from "react-router-dom";

// Mui
import { Box, Stack, Chip } from "@mui/material";

// Project imports
import LocationSection from "./Components/LocationSection";

// Helpers
import haversine from "haversine-distance";

// Temp Data
import { cities } from "../../Assets/Temp/Data";

const TripView = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const params = {
    origin: searchParams.get("origin"),
    destination: searchParams.get("destination"),
    date: searchParams.get("date"),
    passengers: searchParams.get("passengers"),
    intermediateCities: searchParams.getAll("intermediateCities"),
  };
  const GetPosition = (value) => {
    const city = cities.find((arr) => arr[0] === value);
    if (city) return { latitude: city[1], longitude: city[2] };
  };

  const citiesPositions = [
    GetPosition(params.origin),
    ...params.intermediateCities.map((city) => GetPosition(city.split("_")[0])),
    GetPosition(params.destination),
  ];

  let totalDistance = 0;
  const citiesDistances = citiesPositions.map((position, index) => {
    if (index === 0) {
      return 0;
    }
    const temp = Math.floor(
      haversine(position, citiesPositions[index - 1]) / 1000
    );
    totalDistance += temp;
    return temp;
  });
  return (
    <Box sx={{ display: "flex", justifyContent: "center", margin: "2rem" }}>
      <Stack>
        <Box sx={{ width: "50rem" }}>
          <Stack>
            <Stack
              direction="row"
              sx={{ display: "flex", justifyContent: "space-around" }}
            >
              <Chip label={`City of Origin: ${params.origin}`} />
              <Chip label={`City of Destination: ${params.destination}`} />
              <Chip label={`Date of Trip: ${params.date}`} />
              <Chip label={`Number of Passengers: ${params.passengers}`} />
            </Stack>
            <Chip
              label={`Total Distance: ${totalDistance} KM`}
              sx={{ margin: "2rem" }}
            />
          </Stack>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "2rem",
          }}
        >
          <Stack>
            <LocationSection
              location={params.origin}
              type="origin"
              distance={citiesDistances[0]}
            />
            {params.intermediateCities.map((city, index) => {
              return (
                <LocationSection
                  key={city.split("_")[1]}
                  location={city.split("_")[0]}
                  type="intermediate"
                  distance={citiesDistances[index + 1]}
                />
              );
            })}
            <LocationSection
              location={params.destination}
              type="destination"
              distance={citiesDistances[citiesDistances.length - 1]}
            />
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default TripView;
