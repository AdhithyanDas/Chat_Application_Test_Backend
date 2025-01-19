const chatRoom = require('../Models/chatRoomModel')

exports.createRoom = async (req, res) => {
    try {
        const { name } = req.body
        if (!name) {
            res.status(406).json("Invalid data!")
        } else {
            const newRoom = new chatRoom({ name })

            const existingRoom = await chatRoom.findOne({ name })
            if (existingRoom) {
                res.status(400).json("Room already exists!")
            } else {
                await newRoom.save()
                res.status(200).json(newRoom)
            }
        }
    } catch (error) {
        console.log(error)
        res.status(404).json("Failed to create room!")
    }
}

exports.getAllRooms = async (req, res) => {
    try {
        const rooms = await chatRoom.find().sort({ createdAt: -1 })
        res.status(200).json({ rooms })
    } catch (error) {
        console.log(error)
        res.status(404).json("Failed to get rooms!")
    }
}

exports.updateRoom = async (req, res) => {
    try {
        const { roomId } = req.params
        const { name } = req.body
        const existingRoom = await chatRoom.findOne({ _id: roomId })
        existingRoom.name = name
        await existingRoom.save()
        res.status(200).json(existingRoom)
    } catch (error) {
        console.log(error)
        res.status(404).json("Failed to update room!")
    }
}

exports.deleteRoom = async (req, res) => {
    try {
        const { id } = req.params
        const result = await chatRoom.findOneAndDelete({ _id: id })
        res.status(200).json(result)
    } catch (error) {
        console.log(error)
        res.status(404).json("Failed to delete room!")
    }
}

exports.joinRoom = async (req, res) => {
    try {
        const { roomId } = req.params
        const { userId, username } = req.payload
        const room = await chatRoom.findById(roomId)
        room.participants.push({ userId, username })
        await room.save()
        res.status(200).json(room)
    } catch (error) {
        console.log(error)
        res.status(404).json("Failed to join room!")
    }
}

exports.getJoinedRooms = async (req, res) => {
    try {
        const userId = req.payload.userId;
        const rooms = await chatRoom.find({
            "participants.userId": userId
        });
        res.status(200).json({ rooms });
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Failed to fetch rooms!" });
    }
};
