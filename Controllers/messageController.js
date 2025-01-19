const Message = require('../Models/messageModel')
const chatRoom = require('../Models/chatRoomModel')

exports.sendMessage = async (req, res) => {
    try {
        const { content } = req.body
        const { roomId } = req.params
        const senderId = req.payload.userId
        if (!roomId || !content) {
            res.status(406).json("Invaid data!")
        } else {
            const room = await chatRoom.findById(roomId)
            const newMessage = new Message({
                roomId, senderId, content
            })
            await newMessage.save()
            res.status(200).json(newMessage)
        }
    } catch (error) {
        console.log(error)
        res.status(406).json("Failed to send message!")
    }
}

exports.getMessages = async (req, res) => {
    try {
        const { roomId } = req.params
        const messages = await Message.find({ roomId }).sort({ createdAt: 1 }).populate('senderId', 'username').exec()
        if (!messages) {
            res.status(404).json("No messages found!")
        } else {
            res.status(200).json({ messages })
        }
    } catch (error) {
        console.log(error)
        res.status(406).json("Failed to fetch messages!")
    }
}