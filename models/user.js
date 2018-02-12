const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const SKILLS = require("../config/user-skills");

const userSchema = new Schema({
  username: {
    required: true,
    unique: true,
    type: String
  },
  password: {
    required: true,
    type: String
  },
  email: {
    required: true,
    type: String
  },
  firstname: {
    required: true,
    type: String
  },
  lastname: {
    required: true,
    type: String
  },
  adress: {
    adresse: {
      required: true,
      type: String
    },
    zipcode: {
      required: true,
      type: String
    },
    city: {
      required: true,
      type: String
    }
  },
  age: {
    type: Number
  },
  category: {
    required: true,
    enum: SKILLS,
    type: String
  },
  role: {
    required: true,
    enum: ["coach", "candidate"],
    type: String
  },
  description: String
});

module.exports = mongoose.model("User", userSchema);
