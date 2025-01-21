import express from 'express';
import mongoose from 'mongoose';
import AssignIncident from '../models/assignedIncident.js';
import User from '../models/user.js';
import Incident from '../models/incident.js';
import { assignIncident, getAllassigned, getAssignedById } from '../controllers/assignedIncidents.js';

const router = express.Router();


//assign incident to an officer
router.post("/add", assignIncident);


//Get all assigned incidents by username
router.get("/:username", getAllassigned);

router.get("/detail/:id", getAssignedById);


export default router;