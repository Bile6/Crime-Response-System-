import mongoose from "mongoose";

const assignedIncidentSchema = new mongoose.Schema({
    incidentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Incident', required: true },
    officerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: {type: String},
    priority: {type: String}
});

const AssignIncident = mongoose.model('AssignIncident', assignedIncidentSchema);
export default AssignIncident;