const mongoose = require('mongoose')
const Schema = mongoose.Schema
const timestamps = require('mongoose-timestamp');

const passwordSchema = new Schema({
  user:  { type: Schema.Types.ObjectId, ref: 'User' },
  url: String,
  username: String,
  password: String
})

passwordSchema.plugin(timestamps);

module.exports= mongoose.model('Password', passwordSchema)
