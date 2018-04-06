const Password = require('../models/password')

module.exports = {
  index (req, res) {
    Password.find({user: req.user._id}).exec(function (err, data) {
      if(err) return res.status(500).json({ message: err })
      return res.status(200).json({
        message: "Success Read All Password",
        data
      })
    })
  },
  create (req, res) {
    const { url, username, password} = req.body
    const user = req.user._id
    const input = { username, url, password, user }
    Password.create(input, function (err, data) {
      if (err) return res.status(500).json({message: err})
      res.status(201).json({
        message: "Success Add new Password",
        data
      })
    })
    
  },
  update (req, res) {
    const user = req.user._id
    const id = req.params.id

    Password.findOne({_id: id}).exec(function (err, data) {
      if(err) return res.status(500).json({ message: err })
      if (data && data.user == user) {
        Password.findOneAndUpdate({_id: id}, req.body, { new: true }, function (err, data) {
          if(err) return res.status(500).json({ message: err })
          return res.status(200).json({
            message: "Success Update a Password",
            data
          })
        }) 
      } else {
        return res.status(403).json({
          message: "Cannot Update, No Authorization",
        })
      }
    })
  },
  destroy (req, res) {
    const user = req.user._id
    const id = req.params.id
    Password.findOne({_id: id}).exec(function (err, data) {
      if(err) return res.status(500).json({ message: err })
      console.log(user)
      if (data && data.user == user) {
        Password.findOneAndRemove({_id: id}, function (err, data) {
          if(err) return res.status(500).json({ message: err })
          return res.status(200).json({
            message: "Success Delete a Password",
            data
          })
        }) 
      } else {
        return res.status(403).json({
          message: "Cannot Delete, No Authorization",
        })
      }
    })
  }

}
