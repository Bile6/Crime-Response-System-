import mongoose from "mongoose";

const incidentSchema = new mongoose.Schema({
  typeOfIncident: { type: String, required: true },
  date: { type: Date, required: true },
  description: { type: String, required: true },
  location: { type: String, require: true },
  evidence: { type: String },
  status: { type: String, default: "pending" },
  witnessInfo: {
    name: { type: String },
    phone: { type: Number },
  },
});

const Incident = mongoose.model("Incident", incidentSchema);

export default Incident;