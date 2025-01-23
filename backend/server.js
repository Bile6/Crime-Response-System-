import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoute from "./routes/user.js";
import incidentRouter from "./routes/incident.js";
import assignedRouter from "./routes/assignedIncident.js";
import cors from 'cors';
import { authenticate, authorize } from './middleware/auth.js';
import bodyParser from "body-parser";

dotenv.config();


const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());

app.use("/api/users", userRoute);
app.use("/api/incident", incidentRouter);
app.use("/api/incident/assign", assignedRouter);

const port = 5000;
connectDB();


app.listen(port, ()=> {
    console.log(`Server running on port ${port}`);
});