const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    status: {
        type: String,
        default: 'offline'
    },
    lastSeen: {
        type: Date,
        default: Date.now()
    }
})

userSchema.index({ username: 1 })

const User = mongoose.model("users", userSchema)

module.exports = User