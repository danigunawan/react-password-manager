const jwt = require('jsonwebtoken')

module.exports = {
  auth (req, res, next) {
    try {
      const token = req.headers.token
      const decoded = jwt.verify(token, 'secret');
      req.user = decoded
      next()
    } catch(err) {
      res.status(403).json({ message: "Invalid Token" })
    }
  }
}
