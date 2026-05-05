const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true
  },
  status: {
    enum: ["Active", "Frozen", "Closed"],
    message: "Status must be one of: Active, Frozen, Closed",
    type: String,
    required: true,
    default: "Active"
  },
  currency: {
    type: String,
    required: true,
    default: "INR"
  },
}, { timestamps: true });

accountSchema.index({userId: 1, status: 1})

const accountModel = mongoose.model("account", accountSchema);

module.exports = accountModel