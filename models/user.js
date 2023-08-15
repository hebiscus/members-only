const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: String,
    username: {type: String, required: true},
    password: {type: String, required: true},
    membershipStatus: {type: String, default: "basic"},
})

userSchema.virtual('fullName').get(() => {
    return this.firstName + " " + this.lastName;
});

module.exports = mongoose.model("User", userSchema);