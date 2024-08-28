const express = require('express');
const router = express.Router();
const { Account } = require('../db');
const mongoose = require('mongoose');
const { authMiddleware } = require('../middleware');

// Balance Route
router.get("/balance", authMiddleware, async function(req, res) {
    try {
        const account = await Account.findOne({
            userId: req.userId
        });
        
        if (!account) {
            return res.status(404).json({ message: "Account not found" });
        }

        res.json({
            balance: account.balance
        });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving balance", error: error.message });
    }
});

// Transfer Route
router.post("/transfer", authMiddleware, async function(req, res) { // Use POST for transfer action
    const currentSession = await mongoose.startSession();
    currentSession.startTransaction();

    try {
        const { amount, to } = req.body; // Amount -> how much to send; To -> whom to send

        // Fetch the sender's account within the transaction
        const account = await Account.findOne({ userId: req.userId }).session(currentSession);

        if (!account || account.balance < amount) {
            await currentSession.abortTransaction();
            return res.status(411).json({
                message: "Insufficient balance"
            });
        }

        // Fetch the recipient's account within the transaction
        const toAccount = await Account.findOne({ userId: to }).session(currentSession);

        if (!toAccount) {
            await currentSession.abortTransaction();
            return res.status(411).json({
                message: "Invalid recipient"
            });
        }

        // Perform the transaction: deduct from sender and add to recipient
        await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(currentSession);
        await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(currentSession);

        // Commit the transaction
        await currentSession.commitTransaction();
        res.json({
            message: "Transfer successful"
        });
    } catch (error) {
        // Abort the transaction in case of error
        await currentSession.abortTransaction();
        res.status(500).json({
            message: "Error processing transfer",
            error: error.message
        });
    } finally {
        currentSession.endSession();
    }
});

module.exports = router;
