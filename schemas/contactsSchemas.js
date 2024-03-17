import mongoose from "mongoose";
import User from "./userSchema.js";
import Joi from "joi";

const createContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const updateContactSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  phone: Joi.string().min(3).max(30),
})
  .min(1)
  .messages({ "object.min": "Body must have at least one field" });

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
    type: String,
    required: [true, "Phone is required"],
    unique: true,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: User,
    required: true,
  },
});
export const schemasContact = {
  createContactSchema,
  updateFavoriteSchema,
  updateContactSchema,
};

export default mongoose.model("Contact", contactsSchema);
