const mongoose = require('mongoose');

const chatRoomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    participants: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
        },
        username: {
            type: String,
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const chatRoom = mongoose.model('chatRooms', chatRoomSchema);

module.exports = chatRoom;
