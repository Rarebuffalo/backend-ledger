const mongoose = require("mongoose");

const ledgerSchema = new mongoose.Schema({
  account: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
    required: true,
    index: true,
    immutable: true
  },
  amount: {
    type: Number,
    required: true,
    immutable: true
  },
  transaction: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Transaction",
    required: true,
    index: true,
    immutable: true
  },
  type: {
    type: String,
    enum: ["credit", "debit"],
    required: true,
    immutable: true
  }
  
});


function preventLedgerModification() {
  throw new Error("Ledger entrires are immutable and cannot be modified."); 
}

ledgerSchema.pre('findOneAndUpdate', preventLedgerModification);
ledgerSchema.pre('updateOne', preventLedgerModification);
ledgerSchema.pre('deleteOne', preventLedgerModification);
ledgerSchema.pre('remove', preventLedgerModification);
ledgerSchema.pre('deleteMany', preventLedgerModification);
ledgerSchema.pre('updateMany', preventLedgerModification);
ledgerSchema.pre('findOneAndDelete', preventLedgerModification);


const ledgerModel = mongoose.model("Ledger", ledgerSchema);

module.exports = ledgerModel;
