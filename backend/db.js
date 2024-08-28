const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect("mongodb+srv://niladrihazra100xDevs:$Humi2003@cluster0.ydx27wq.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected successfully');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 8
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    }
});

const accountSchema = new mongoose.Schema({
    userId: {  // Corrected field name from uerrId to userId
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true  // Adding required to ensure consistency
    },
    balance: {
        type: Number,
        required: true
    }
});

// Create models for the schemas
const User = mongoose.model('User', userSchema);
const Account = mongoose.model('Account', accountSchema);

// Export models
module.exports = {
    User,
    Account
};
