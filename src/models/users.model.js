const { Schema, model } = require('mongoose')

const userSchema = new Schema({
    first_name: String,
    last_name: String,
    email: { 
        type: String,
        required: true
    },
    age: Number,
    password: { 
        type: String, 
        required: true 
    },
    role: {
        type: String,
        default: 'user'
    }
})

const usersModel = model('users', userSchema)

module.exports = {
    usersModel
}