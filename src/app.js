import cors from "cors";
import express from "express";
import { connect } from "./config/database.js";
import cosignerRoutes from "./routes/cosigner.routes.js";
import ownerRoutes from "./routes/owner.routes.js";
import tenantRoutes from "./routes/tenant.routes.js";
import userRoutes from "./routes/user.routes.js";

const app = express();
app.use(cors());

//Middleware
app.use(express.json());
connect();

app.get("/", (req, res) => {
  res.json("funcion");
});
app.use("/user", userRoutes);
app.use("/owner", ownerRoutes);
app.use("/tenant", tenantRoutes);
app.use("/cosigner", cosignerRoutes);



export default app;
