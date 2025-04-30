import mongoose from 'mongoose';

const sellerSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  gst: { type: String, required: true },
  aadhaar: { type: String, required: true },
  otp: { type: String }, // optional, you can validate separately
  password: { type: String, required: true },
}, { timestamps: true });

const Seller = mongoose.models.Seller || mongoose.model('Seller', sellerSchema);

export default Seller;
