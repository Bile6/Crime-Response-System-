import mongoose from "mongoose";
import AssignIncident from "../models/assignedIncident.js";
import Incident from "../models/incident.js";
import User from "../models/user.js";

export const assignIncident = async (req, res) => {
    const { incidentId, officerUsername, priority, typeOfIncident,
         description, location, date, status } = req.body;
    try {
        const officer = await User.findOne({ username: officerUsername });
        if (!officer) {
          return res.status(404).json({ message: "Officer not found" });
        }
    
        const newAssignment = new AssignIncident({
            incidentId,
            officerUsername,
            officerId: officer._id,
            priority,
            status,
        });
    
        await newAssignment.save();
        res.status(200).json({ message: "Incident assigned successfully" });
      } catch (error) {
        console.error("Error assigning incident:", error);
        res.status(500).json({ message: "Server error" });
      }};

export const getAllassigned = async (req, res) => {
    const { username } = req.params;

 
    try {
        const officer = await User.findOne({_id: username });
        if (!officer) {
          return res.status(404).json({ error: "Officer not found" });
        }
        
        const assignedIncidents = await AssignIncident.find({ officerId: officer._id }).populate('incidentId');
        if (assignedIncidents.length === 0) {
          return res.status(404).json({ message: "No incidents assigned yet" });
        }
    
        res.status(200).json({ data: assignedIncidents });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
};



export const getAssignedById = async (req, res) => {
  try {
    console.log("the params is: ", req.params);
    // Populate incidentId to get full incident details
    const incidents = await Incident.findOne({_id: req.params.id});
    if (!incidents) {
      return res.status(404).json({ message: "Incident not found" });
    } 
      console.log("the data: ", incidents);
    res.json({ data: incidents });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch incident details" });
  }
};