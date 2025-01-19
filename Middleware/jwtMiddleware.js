const jwt = require('jsonwebtoken')

const jwtMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        const result = jwt.verify(token, process.env.SECRET_KEY)
        req.payload = {
            userId: result.userId,
            username: result.username
        };
        next()
    } catch (error) {
        res.status(400).json(error)
    }
}

module.exports = jwtMiddleware