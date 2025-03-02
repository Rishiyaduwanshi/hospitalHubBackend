import mongoose from 'mongoose';

const hospitalSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
    },
    speciality: { 
      type: [String],
      required : true,
    },
    description : {
        type : String,
    },
    rating : { type : Number, default : 0},
    numberOfDoctors: { type: Number },
    numberOfDepartments: { type: Number }
  },
  { timestamps: true }
);

export default mongoose.model('Hospital', hospitalSchema);
