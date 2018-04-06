const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

module.exports = {
  signin (req,res) {
    const { email, password } = req.body
    User.findOne({email: email}).exec(function (err,doc) {
      if (doc) {
        const check = bcrypt.compareSync(password, doc.password); 
        if (check) {
          const token = jwt.sign({ _id: doc._id }, 'secret');
          res.status(200).json({
            message: "Success Sign In",
            token
          })
        } else {
          res.status(403).json({ message: "User Not Found" })
        }
      } else {
        res.status(403).json({ message: "User Not Found" })
      }
    })
  },
  register (req,res) {
    const { email, name, password } = req.body
    const hash = bcrypt.hashSync(password, 10)
    const input = { email, name, password: hash }
    User.findOne({email: email}).exec(function (err,doc) {
      if (doc) {
        res.status(400).json({ message: "Email has been used" })
      } else {
        User.create(input, function (err, data) {
          if(err) res.status(500).json({ message: err })
          const token = jwt.sign({ _id: data._id }, 'secret');
          res.status(200).json({
            message: "Success Register New User",
            token
          })
        })
      }
    })
  },
}
