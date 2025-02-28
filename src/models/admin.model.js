import mongoose from 'mongoose';

const AdminSchema = new mongoose.Schema({
  username: { type: String, required: true },
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: {
    type: String,
    required: true,
    min: [8, 'Password should be of atleast of 8 characters'],
  },
});

export default mongoose.model('Admin', AdminSchema);
