import mongoose from "mongoose"


const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true, // Automatically converts to lowercase
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
  forgotPasswordToken: String,
  forgotPasswordTokenexpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
});

const User=mongoose.models.users || mongoose.model("users" , userSchema);

export default User;