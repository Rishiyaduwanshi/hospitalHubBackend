import mongoose from 'mongoose';

const AdminSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, trim : true, lowercase: true },
    name: { type: String, required: true, trim : true },
    email: { type: String, required: true, unique: true, trim : true,   lowercase: true },
    password: {
      type: String,
      required: true,
      trim : true,
    },
    isApproved : { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Admin', AdminSchema);
