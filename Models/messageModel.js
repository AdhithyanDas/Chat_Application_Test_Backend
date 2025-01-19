const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    roomId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'chatRoom',
        required: true
    },
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

messageSchema.index({ roomId: 1, timestamp: 1 })

const Message = mongoose.model("messages", messageSchema)

module.exports = Message