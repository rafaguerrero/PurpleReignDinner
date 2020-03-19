// /backend/data.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure 
const PlanSchema = new Schema(
  {
    id: { type: Number, unique: true, required : true }, // unique not working fine
    location: { type: Number,  required :true },
    restaurants: Array,
    votes: Array,
  },
  { 
    timestamps: true 
  }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Plan", PlanSchema);