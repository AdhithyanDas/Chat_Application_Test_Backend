const express = require('express')

const userController = require('../Controllers/userController')
const chatRoomController = require('../Controllers/chatRoomController')
const messageController = require('../Controllers/messageController')

const jwtMiddle = require('../Middleware/jwtMiddleware')

const router = express.Router()

router.post('/reg', userController.userRegistration)
router.post('/log', userController.userLogin)

router.post('/addroom', jwtMiddle, chatRoomController.createRoom)
router.get('/getrooms', jwtMiddle, chatRoomController.getAllRooms)
router.put('/updateroom/:roomId', jwtMiddle, chatRoomController.updateRoom)
router.delete('/deleteroom/:id', jwtMiddle, chatRoomController.deleteRoom)
router.post('/joinroom/:roomId', jwtMiddle, chatRoomController.joinRoom)
router.get('/getjoinedrooms', jwtMiddle, chatRoomController.getJoinedRooms)

router.post('/sendmessage/:roomId', jwtMiddle, messageController.sendMessage)
router.get('/fetchmessages/:roomId', jwtMiddle, messageController.getMessages)

module.exports = router