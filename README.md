🚌 **OnRoute – Live Bus Tracking & Booking Made Easy**
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
OnRoute is a simple and intuitive web app that lets users track buses live, book tickets, and plan their route — just like a modern bus booking platform. From signup to live location updates, it gives you the full journey experience, all in your browser.
- 🔐 Sign up and log in
- 🧭 Search for available bus routes
- 🎟️ Book seats on available buses
- 📍 Track the live movement of buses on Google Maps
- 🧾 View and download tickets
- ❌ Cancel bookings
- 📬 (Coming Soon) In-app notifications & payment integration
- 🧑‍💼 (Coming Soon) Admin dashboard to manage routes and buses


## 📸 Screenshots

| Landing Page |
![image](https://github.com/user-attachments/assets/2d0d79e3-9ade-43b5-970c-d914a9b9b14e)

| Route & Bus Selection and Live Tracking | 
![image](https://github.com/user-attachments/assets/8aafb330-8ff9-4950-97e4-1f4973aca686)

| Bookings |
![image](https://github.com/user-attachments/assets/2564ddbf-83ca-40ee-8780-eb6388e036d2)




## 🚀 Features

- **Authentication**: Firebase-based secure user signup/login
- **Live Bus Tracking**: Google Maps API simulates live bus movement along selected routes
- **Bookings**: Book buses with real-time feedback
- **PDF Ticket Download**: Save your ticket to device
- **My Bookings Page**: View, cancel, or re-book buses
- **Responsive UI**: Clean modern design with Material-UI (MUI v5)

---

## 🛠️ Tech Stack

| Category      | Tools Used                          |
|---------------|--------------------------------------|
| Frontend      | React.js, React Router              |
| UI Framework  | Material-UI (MUI v5)                |
| Maps          | Google Maps JavaScript API          |
| Authentication| Firebase Auth                       |
| State Storage | LocalStorage (for bookings)         |
| PDF Export    | jsPDF                               |
| Future Plans  | Stripe (Payments), Notifications, Admin Panel |

---

## 📂 Project Structure


src/
├── components/
│   ├── BookingSnackbar.js
│   ├── BusList.js
│   ├── Login.js
│   ├── MapComponent.js
│   ├── MyBookings.js
│   ├── Navbar.js
│   ├── ProtectedRoute.js
│   └── Signup.js
├── App.js
├── index.js
├── index.css
└── styles.css
