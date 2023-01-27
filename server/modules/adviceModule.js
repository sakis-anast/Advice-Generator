const mongoose = require("mongoose");

const AdviceSchema = new mongoose.Schema({
  advice: String,
  userId: String,
});

const Advice = mongoose.model("Advice", AdviceSchema);

module.exports = Advice;
