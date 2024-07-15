import mongoose from "mongoose";

// set schema
const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
});

// create table
const Food = mongoose.model("Food", foodSchema);

export default Food;
