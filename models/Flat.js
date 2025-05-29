import mongoose from "mongoose";

const FlatSchema = new mongoose.Schema(
  {
    flatNumber: {
      type: String,
      required: true,
    },
    buildingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Building",
      required: true,
    },
    ownerId: {
      // This would ideally be your internal MongoDB User _id
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    residentClerkId: {
      // If tenant, store their Clerk ID
      type: String,
    },
    areaSqFt: Number,
    // ... other fields from your schema definition
  },
  { timestamps: true }
);

export default mongoose.models.Flat || mongoose.model("Flat", FlatSchema);
