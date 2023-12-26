// models/category.js
const mongoose = require('mongoose');

const designSchema = new mongoose.Schema({
  designId: String,
  heading: String,
  size: String,
  image: Buffer,
});

const categorySchema = new mongoose.Schema({
  name: String,
  slug: String,
  noItems: Number,
  heading: String,
  desc: String,
  items: [designSchema],
});

module.exports = mongoose.model('Category', categorySchema);
