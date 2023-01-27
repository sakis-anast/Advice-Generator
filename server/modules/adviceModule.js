const mongoose = require("mongoose");

const AdviceSchema = new mongoose.Schema({
  advice: String,
  userId: String,

  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Advice = mongoose.model("Advice", AdviceSchema);

module.exports = Advice;
