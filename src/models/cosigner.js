import mongoose from "mongoose";

const cosignerSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  cedula: {
    type: String,
    required: true,
    unique: true,
    immutable: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
});

const Cosigner = mongoose.model("Cosigner", cosignerSchema);

export default Cosigner;
