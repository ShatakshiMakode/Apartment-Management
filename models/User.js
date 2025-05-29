import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    clerkUserId: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: [true, "First name is required."],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required."],
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      match: [/.+\@.+\..+/, "Please fill a valid email address"],
    },
    phoneNumber: String,
    role: {
      type: String,
      enum: [
        "resident",
        "tenant",
        "admin",
        "staff",
        "committee_member",
        "super_admin",
      ],
      default: "resident",
    },
    societyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Society", // Ensure you have a Society model
    },
    buildingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Building", // Ensure you have a Building model
    },
    flatId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Flat", // Ensure you have a Flat model
    },
    profilePicture: String,
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
); // Adds createdAt and updatedAt automatically

// The `mongoose.models.User ||` part is to prevent errors during hot-reloading in development
// where the model might already be compiled.
export default mongoose.models.User || mongoose.model("User", UserSchema);
