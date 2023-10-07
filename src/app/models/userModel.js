const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const User = new Schema({
    name: { type: String, required: true, trim: true},
    email: { type: String, required: true, unique: true,},
    password: { type: String, required: true, minLength: 7 },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
}, {
    timestamps: true,
});

module.exports = mongoose.model('User', User);