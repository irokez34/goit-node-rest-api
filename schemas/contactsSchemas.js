// import Joi from "joi";

// export const createContactSchema = Joi.object({
//   name: Joi.string().required(),
//   email: Joi.string().required(),
//   phone: Joi.number().required(),
//   favorite: Joi.boolean().default(false),
//   owner: {
//     type: Schema.Types.ObjectId,
//     ref: "user",
//   },
// });

// export const updateContactSchema = Joi.object({
//   name: Joi.string(),
//   email: Joi.string(),
//   phone: Joi.number(),
// })
//   .min(1)
//   .message("Body must have at least one field");

// export const toggleFavoriteContactSchema = Joi.object({
//   favorite: Joi.boolean().required(),
// });

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
