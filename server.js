require("dotenv").config();

const express = require("express");
const connectDB = require("./src/config/db");
const cors = require("cors");

const authRoutes = require("./src/routes/auth.routes");
const dashboardRoutes = require("./src/routes/dashboard.routes");
const menuItemRoutes = require("./src/routes/menuItem.routes");
const userRoutes = require("./src/routes/user.routes");
const reservationRoutes = require("./src/routes/reservation.routes");
const contactRoutes = require("./src/routes/contact.routes");
const orderRoutes = require("./src/routes/order.routes");

const app = express();
app.use(
  cors({
    origin: ["https://tastybites-frontend-nu.vercel.app","http://localhost:5173"],
    credentials: true,
  }),
);
connectDB();
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Welcome to my server");
});

app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/menu-items", menuItemRoutes);
app.use("/api/users", userRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/orders", orderRoutes);

app.listen(5000, () => {
  console.log("server running....");
});


// ===== AUTH =====
// POST   http://localhost:5000/api/auth/register
// POST   http://localhost:5000/api/auth/login
// PUT    http://localhost:5000/api/auth/update
// DELETE http://localhost:5000/api/auth/delete

// ===== MENU ITEMS =====
// GET    http://localhost:5000/api/menu-items
// GET    http://localhost:5000/api/menu-items/:id
// POST   http://localhost:5000/api/menu-items/admin        [admin, multipart/form-data]
// PUT    http://localhost:5000/api/menu-items/admin/:id    [admin, multipart/form-data]
// DELETE http://localhost:5000/api/menu-items/admin/:id   [admin]

// ===== USERS =====
// GET    http://localhost:5000/api/users/admin             [admin]
// DELETE http://localhost:5000/api/users/admin/:id        [admin]

// ===== DASHBOARD =====
// GET    http://localhost:5000/api/dashboard/admin/getStats [admin]

// ===== RESERVATIONS =====
// POST   http://localhost:5000/api/reservations            [public]
// GET    http://localhost:5000/api/reservations/admin      [admin]
// PUT    http://localhost:5000/api/reservations/admin/:id  [admin]

// ===== CONTACT / MESSAGES =====
// POST   http://localhost:5000/api/contact                 [public]
// GET    http://localhost:5000/api/contact/admin           [admin]