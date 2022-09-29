const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const heroSchema = new Schema({
  nickname: {
    type: String,
    required: true,
  },
  real_name: {
    type: String,
    required: true,
  },
  origin_description: {
    type: String,
    required: true,
  },
  superpowers: {
    type: Array,
    required: true,
  },
  catch_phrase: {
    type: String,
    required: true,
  },
  image: {
    type: Array,
    required: true,
  },
});

module.exports = mongoose.model("Hero", heroSchema);
