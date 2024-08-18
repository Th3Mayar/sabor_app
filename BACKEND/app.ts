import express from "express";
import cors from "cors";
import userRoutes from "./src/routes/userRoutes.js";
import roleRoutes from "./src/routes/roleRoutes.js";
import stateRoutes from "./src/routes/stateRoutes.js";
import reservationRoutes from "./src/routes/reservationRoutes.js";
import dishRoutes from "./src/routes/dishRoutes.js";
import reservationScheduleRoutes from "./src/routes/reservationScheduleRoutes.js";
import availabilityRoutes from "./src/routes/availabilityRoutes.js";
import configurationRoutes from "./src/routes/configurationRoutes.js";
import companyRoutes from "./src/routes/companyRoutes.js";
import menuRoutes from "./src/routes/menuRoutes.js";
import categoryRoutes from "./src/routes/categoryRoutes.js";
import errorHandler from "./src/middlewares/errorHandler.js";
import authRoutes from "./src/routes/authRoutes.js";
import { authenticateJWT } from "./src/middlewares/authenticateJWT.js";
import dotenv from "dotenv";
import { config } from "./src/config/db.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello from api");
});

// Routes not protected by authentication
app.use("/api", authRoutes);

// Routes protected by authentication
app.use("/api", authenticateJWT, userRoutes);
app.use("/api", authenticateJWT, roleRoutes);
app.use("/api", authenticateJWT, stateRoutes);
app.use("/api", authenticateJWT, reservationRoutes);
app.use("/api", authenticateJWT, dishRoutes);
app.use("/api", authenticateJWT, reservationScheduleRoutes);
app.use("/api", authenticateJWT, availabilityRoutes);
app.use("/api", authenticateJWT, configurationRoutes);
app.use("/api", authenticateJWT, companyRoutes);
app.use("/api", authenticateJWT, menuRoutes);
app.use("/api", authenticateJWT, categoryRoutes);

// Error handler middleware
app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`Server running on port http://localhost:${config.port}`);
});