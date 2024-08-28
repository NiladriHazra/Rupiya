const express = require('express');
const router = express.Router();
const zod = require('zod');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing
const { User, Account } = require('../db');
const { JWT_SECRET } = require('../config');
const { authMiddleware } = require('../middleware');

// Signup route
const signupBody = zod.object({
    username: zod.string().email(),
    firstname: zod.string(),
    lastname: zod.string(),
    password: zod.string()
});

router.post('/signup', async function(req, res) {
    const { success } = signupBody.safeParse(req.body);
    if (!success) {
        return res.status(411).json({
            message: "Invalid details"
        });
    }

    const existingUser = await User.findOne({
        username: req.body.username
    });

    if (existingUser) {
        return res.status(411).json({
            message: "User already exists"
        });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = await User.create({
        username: req.body.username,
        password: hashedPassword,
        firstName: req.body.firstname,
        lastName: req.body.lastname
    });

    const userId = user._id;

    await Account.create({
        userId: userId,
        balance: 1 + Math.random() * 10000  // Random balance between 1 and 10000
    });

    const token = jwt.sign({ userId }, JWT_SECRET);

    res.status(200).json({
        message: "User created successfully",
        token: token
    });
});

// Signin route
const signInBody = zod.object({
    username: zod.string().email(),
    password: zod.string()
});

router.post('/signin', async function(req, res) {
    const { success } = signInBody.safeParse(req.body);
    if (!success) {
        return res.status(411).json({
            message: "Invalid details"
        });
    }

    const user = await User.findOne({
        username: req.body.username
    });

    if (user && await bcrypt.compare(req.body.password, user.password)) {
        const token = jwt.sign({ userId: user._id }, JWT_SECRET);
        res.json({
            token: token
        });
    } else {
        res.status(411).json({
            message: "Invalid username or password"
        });
    }
});

// Update user information route
const updateBody = zod.object({
    firstname: zod.string().optional(),
    lastname: zod.string().optional(),
    password: zod.string().optional()
});

router.put("/", authMiddleware, async function(req, res) {
    const { success } = updateBody.safeParse(req.body);
    if (!success) {
        return res.status(411).json({
            message: "Invalid details"
        });
    }

    try {
        const updateData = {};
        if (req.body.firstname) updateData.firstName = req.body.firstname;
        if (req.body.lastname) updateData.lastName = req.body.lastname;
        if (req.body.password) {
            // Hash new password if provided
            updateData.password = await bcrypt.hash(req.body.password, 10);
        }

        await User.updateOne(
            { _id: req.userId },
            { $set: updateData }
        );

        res.json({
            message: "Updated Successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: "Error updating user",
            error: error.message
        });
    }
});

// Get users with filter route
router.get("/bulk", async function(req, res) {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [
            { firstName: { "$regex": filter, "$options": "i" } },
            { lastName: { "$regex": filter, "$options": "i" } }
        ]
    });

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    });
});

module.exports = router;
