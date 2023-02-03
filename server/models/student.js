import mongoose from "mongoose";

const studentSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First Name is required"],
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: [true, "Last Name is required"],
  },
  Class: {
    type: Number,
    required: [true, "Class is required"],
  },
  division: {
    type: String,
    required: [true, "Division is required"],
  },
  rollNumber: {
    type: Number,
    required: [true, "Roll Number is required"],
  },
  addressLine1: {
    type: String,
    required: [true, "Address is required"],
  },
  addressLine2: {
    type: String,
  },
  landmark: {
    type: String,
    required: [true, "Landmark is required"],
  },
  city: {
    type: String,
    required: [true, "City is required"],
  },
  pincode: {
    type: Number,
    required: [true, "Pincode is required"],
  },
  image: {
    type: String,
  },
});

const Student = new mongoose.model("Student", studentSchema);

export default Student;