const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  fromAccount: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
    required: true,
    index: true,
  },
  toAccount: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
    required: true,
    index: true,
  },
  status: {
    type: String,
    enum: {
      ['pending', 'completed', 'failed', 'reversed'],
      message: "Status must be one of: pending, completed, failed, reversed"
    },
    default: 'pending'
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  idempotencyKey: {
    type: String,
    required: true,
    index: true,
    unique: true
  },
  
}, { timestamps: true });

const transactonModel = mongoose.model("transaction", transactionSchema);

module.exports = transactonModel;