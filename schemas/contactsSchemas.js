import mongoose from "mongoose";
import User from "./userSchema.js";

const { Schema } = mongoose;
const contactsSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },

  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  phone: {
    type: Number,
    required: [true, "Phone is required"],
    unique: true,
  },
  favorite: {
    type: Boolean,
    default: false,
    owner: {
      type: Schema.Types.ObjectId,
      ref: User,
    },
  },
});

export default mongoose.model("Contact", contactsSchema);
