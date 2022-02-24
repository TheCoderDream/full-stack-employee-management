const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    userName: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    date:{
        type: Date,
        required: true
    },
    loggedOn:{
        type: Boolean,
        required: true,
        default: false
    }
});

UserSchema.methods.verifyPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model('User',UserSchema);
module.exports = User;