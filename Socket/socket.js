const http = require('http')
const express = require('express')
const { Server } = require('socket.io')
const User = require('../Models/userModel')
// const redis = require('redis')

// const publisher = redis.createClient()
// const subscribar = redis.createClient()

// publisher.connect()
// subscribar.connect()

const chatApp = express()

const server = http.createServer(chatApp);
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173"],
        methods: ["POST", "GET"],
    },
})

const userSocket = {}
const lastSeen = {}

io.on("connection", (socket) => {
    console.log("a user connected", socket.id)

    const userId = socket.handshake.query.userId
    lastSeen[userId] = new Date().toISOString()
    userSocket[userId] = socket.id
    console.log("User Socket : ", userSocket)
    io.emit("getOnlineUsers", Object.keys(userSocket))
    io.emit("updateLastSeen", lastSeen)


    socket.on('sendMessage', async (messageData) => {
        const user = await User.findById(messageData.senderId)
        messageData.senderId = { _id: messageData.senderId, username: user.username }
        messageData.createdAt = new Date().toISOString()
        io.emit('receiveMessage', messageData)
        // publisher.publish(messageData.roomId, JSON.stringify(messageData))
    })

    socket.on("disconnect", () => {
        console.log("a user disconnected", socket.id)
        lastSeen[userId] = new Date().toISOString()
        delete userSocket[userId]
        io.emit("getOnlineUsers", Object.keys(userSocket))
        io.emit("updateLastSeen", lastSeen)
        console.log("Updated online users:", Object.keys(userSocket))
    })
})


module.exports = {
    chatApp, server
}
