const transactionModel = require("../models/transaction.model");
const ledgerModel = require("../models/ledger.model");

const accountModel = require("../models/account.model");
const emailService = require("../services/email.service");



async function createTransaction(req, res) {
  const { fromAccount, toAccount, amount } = req.body;

  if (!fromAccount || !toAccount || !amount || !idempotencyKey) {
    return res.status(400).json({
      message: "Missing required fields"
    })
  }
  
}