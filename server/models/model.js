const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: [true, "can't be blank"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "can't be blank"],
    }
})
const user = mongoose.model('user', userAdminSchema, 'users');
// Exporting our model objects
module.exports = userSchema