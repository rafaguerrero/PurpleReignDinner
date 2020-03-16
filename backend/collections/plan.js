// /backend/data.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure 
const PlanSchema = new Schema(
  {
    path: { type: String, unique: true, required : true },
    location: { type: Number,  required :true },
    options: Array,
    voters: Number,
    votes: Array,
  },
  { 
    timestamps: true 
  }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Plan", PlanSchema);