import { Snackbar, Alert } from "@mui/material";

export default function BookingSnackbar({ open, setOpen, message }) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={() => setOpen(false)}
    >
      <Alert severity="success" onClose={() => setOpen(false)}>
        {message}
      </Alert>
    </Snackbar>
  );
}
