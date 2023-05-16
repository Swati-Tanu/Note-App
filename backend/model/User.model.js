const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    pass: String,
})

const UserModel = mongoose.model("user", userSchema)

module.exports={
    UserModel
}