const mongoose = require("mongoose");

const Challenge = mongoose.model(
  "Challenge",
  new mongoose.Schema({
    title: String,
    authors: [{title: String, href: String}],
    type: String,
    img: {src: String, alt: String},
    basicInfo: Array,
    link: String,
  })
);

module.exports = Challenge;