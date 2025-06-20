import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  Snackbar,
} from "@mui/material";
import jsPDF from "jspdf";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMsg, setSnackMsg] = useState("");

  const loadBookings = () => {
    const userEmail = JSON.parse(localStorage.getItem("user"))?.email;
    if (!userEmail) return;
    const stored = JSON.parse(localStorage.getItem("bookings") || "[]");
    const userBookings = stored.filter((b) => b.user === userEmail);
    setBookings(userBookings);
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const handleCancel = (bookingToCancel) => {
    const allBookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    const updatedBookings = allBookings.filter(
      (b) =>
        !(
          b.user === bookingToCancel.user &&
          b.route === bookingToCancel.route &&
          b.busName === bookingToCancel.busName &&
          b.departure === bookingToCancel.departure
        )
    );

    localStorage.setItem("bookings", JSON.stringify(updatedBookings));
    setBookings(updatedBookings.filter((b) => b.user === bookingToCancel.user));
    setSnackMsg("Booking cancelled successfully");
    setSnackOpen(true);
  };

  const downloadTicket = (booking) => {
    const doc = new jsPDF();
    doc.text("Bus Ticket", 10, 10);
    doc.text(`Name: ${booking.user}`, 10, 20);
    doc.text(`Bus: ${booking.busName}`, 10, 30);
    doc.text(`Route: ${booking.route}`, 10, 40);
    doc.text(`Departure: ${booking.departure}`, 10, 50);
    doc.text(`Fare: ${booking.fare}`, 10, 60);
    doc.text(`Seat: ${booking.seat || "N/A"}`, 10, 70);
    doc.save("ticket.pdf");
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        My Bookings
      </Typography>

      <Grid container spacing={3}>
        {bookings.length === 0 ? (
          <Typography>No bookings found.</Typography>
        ) : (
          bookings.map((b, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{b.busName}</Typography>
                  <Typography>Route: {b.route}</Typography>
                  <Typography>Departure: {b.departure}</Typography>
                  <Typography>Fare: {b.fare}</Typography>
                  <Typography>Seat: {b.seat || "N/A"}</Typography>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleCancel(b)}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => downloadTicket(b)}
                    sx={{ mt: 1 }}
                  >
                    Download Ticket
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>

      <Snackbar
        open={snackOpen}
        autoHideDuration={3000}
        onClose={() => setSnackOpen(false)}
        message={snackMsg}
      />
    </Container>
  );
};

export default MyBookings;
