import React, { useState } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Snackbar,
} from "@mui/material";
import MapComponent from "./MapComponent";

const BusList = () => {
  const [selectedSource, setSelectedSource] = useState("");
  const [selectedDestination, setSelectedDestination] = useState("");
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMsg, setSnackMsg] = useState("");

  const routesData = [
    {
      routeName: "Route 1 - Panjtirthi to Kunjwani Chowk",
      source: "Panjtirthi",
      destination: "Kunjwani Chowk",
      routeCoordinates: [
        { lat: 32.7266, lng: 74.857 },
        { lat: 32.7154, lng: 74.865 },
        { lat: 32.7011, lng: 74.873 },
        { lat: 32.694, lng: 74.881 },
        { lat: 32.69, lng: 74.895 },
      ],
      buses: [
        {
          name: "Bus 101",
          departure: "10:00 AM",
          fare: "₹150",
          availableSeats: 30,
        },
        {
          name: "Bus 102",
          departure: "12:00 PM",
          fare: "₹120",
          availableSeats: 28,
        },
      ],
    },
    {
      routeName: "Route 2 - Jewel Chowk to Bagh-e-Bahu",
      source: "Jewel Chowk",
      destination: "Bagh-e-Bahu",
      routeCoordinates: [
        { lat: 32.7285, lng: 74.8603 },
        { lat: 32.723, lng: 74.8705 },
        { lat: 32.7181, lng: 74.8755 },
        { lat: 32.71, lng: 74.882 },
        { lat: 32.705, lng: 74.8905 },
      ],
      buses: [
        {
          name: "Bus 201",
          departure: "9:00 AM",
          fare: "₹100",
          availableSeats: 35,
        },
        {
          name: "Bus 202",
          departure: "11:00 AM",
          fare: "₹90",
          availableSeats: 40,
        },
      ],
    },
  ];

  const handleSourceChange = (event) => {
    setSelectedSource(event.target.value);
    setSelectedDestination("");
    setSelectedRoute(null);
  };

  const handleDestinationChange = (event) => {
    setSelectedDestination(event.target.value);
    const selected = routesData.find(
      (route) =>
        route.source === selectedSource &&
        route.destination === event.target.value
    );
    setSelectedRoute(selected);
  };

  const handleBook = (bus) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      alert("Please login to book.");
      return;
    }

    const newBooking = {
      user: user.email,
      busName: bus.name,
      departure: bus.departure,
      fare: bus.fare,
      route: selectedRoute.routeName,
      seat: null,
    };

    const existing = JSON.parse(localStorage.getItem("bookings") || "[]");
    localStorage.setItem("bookings", JSON.stringify([...existing, newBooking]));

    setSnackMsg("Booking confirmed!");
    setSnackOpen(true);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom align="center">
        Bus Booking & Live Tracking
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>Source</InputLabel>
            <Select
              value={selectedSource}
              onChange={handleSourceChange}
              label="Source"
            >
              {routesData.map((route, index) => (
                <MenuItem key={index} value={route.source}>
                  {route.source}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>Destination</InputLabel>
            <Select
              value={selectedDestination}
              onChange={handleDestinationChange}
              label="Destination"
              disabled={!selectedSource}
            >
              {routesData
                .filter((route) => route.source === selectedSource)
                .map((route, index) => (
                  <MenuItem key={index} value={route.destination}>
                    {route.destination}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {selectedRoute && (
        <>
          <Grid container spacing={3} mt={3}>
            <Grid item xs={12} md={6}>
              <MapComponent
                routeCoordinates={selectedRoute.routeCoordinates}
                source={selectedRoute.source}
                destination={selectedRoute.destination}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="h6">Available Buses</Typography>
              {selectedRoute.buses.map((bus, index) => (
                <Card key={index} sx={{ marginBottom: 2 }}>
                  <CardContent>
                    <Typography variant="h6">{bus.name}</Typography>
                    <Typography>Departure Time: {bus.departure}</Typography>
                    <Typography>Fare: {bus.fare}</Typography>
                    <Typography>
                      Available Seats: {bus.availableSeats}
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      sx={{ marginTop: 2 }}
                      onClick={() => handleBook(bus)}
                    >
                      Book Now
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </Grid>
          </Grid>
        </>
      )}

      <Snackbar
        open={snackOpen}
        autoHideDuration={3000}
        onClose={() => setSnackOpen(false)}
        message={snackMsg}
      />
    </Container>
  );
};

export default BusList;
