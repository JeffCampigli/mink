const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const matchSchema = new Schema({
  userCoach: [
    {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  userCandidat: [
    {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  date: Date,
  status: {
    enum: ["en cours", "accepté", "refusé"],
    type: String
  }
});

module.exports = mongoose.model("Match", matchSchema);
