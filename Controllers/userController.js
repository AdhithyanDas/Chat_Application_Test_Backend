const User = require("../Models/userModel")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.userRegistration = async (req, res) => {
    try {
        const { username, password } = req.body
        if (!username || !password) {
            res.status(406).json("Invaild data!")
        } else {
            const salt = await bcrypt.genSalt(10)
            const hashPassword = await bcrypt.hash(password, salt)

            const newUser = new User({
                username, password: hashPassword
            })

            if (password.length < 6) {
                res.status(400).json("Password must be atleast 6 characters!")
            } else {
                const existingUser = await User.findOne({ username })
                if (existingUser) {
                    res.status(400).json("User already exists!")
                } else {
                    await newUser.save()
                    res.status(200).json(newUser)
                }
            }
        }
    } catch (error) {
        console.log(error)
        res.status(400).json("Registration failed!")
    }
}

exports.userLogin = async (req, res) => {
    try {
        const { username, password } = req.body
        if (!username || !password) {
            res.status(406).json("Invaild data!")
        } else {
            const existingUser = await User.findOne({ username })
            if (existingUser) {
                const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)
                if (!isPasswordCorrect) {
                    res.status(404).json("Invalid password!")
                } else {
                    const token = jwt.sign({ userId: existingUser._id, username }, process.env.SECRET_KEY)
                    res.status(200).json({ token, username: existingUser.username, userId: existingUser._id })
                }
            } else {
                res.status(404).json("Invalid username/password!")
            }
        }
    } catch (error) {
        console.log(error)
        res.status(400).json("Login failed!")
    }
}