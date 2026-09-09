require("dotenv").config();

const express = require("express");
const connectDB = require("./src/config/db");
const cors = require("cors");

const authRoutes = require("./src/routes/auth.routes");
const dashboardRoutes = require("./src/routes/dashboard.routes");
const menuItemRoutes = require("./src/routes/menuItem.routes");
const userRoutes = require("./src/routes/user.routes");

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
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

app.listen(5000, () => {
  console.log("server running....");
});


// POST   http://localhost:5000/api/auth/register
// POST   http://localhost:5000/api/auth/login
// PUT    http://localhost:5000/api/auth/update
// DELETE http://localhost:5000/api/auth/delete

// GET    http://localhost:5000/api/menu-items
// GET    http://localhost:5000/api/menu-items/:id

// POST   http://localhost:5000/api/menu-items/admin
// PUT    http://localhost:5000/api/menu-items/admin/:id
// DELETE http://localhost:5000/api/menu-items/admin/:id

// GET    http://localhost:5000/api/users/admin
// DELETE http://localhost:5000/api/users/admin/:id

// GET    http://localhost:5000/api/dashboard/admin/getStats