const mongoose = require("mongoose");

var taskSchema = new mongoose.Schema({
    messageBody: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
});

var groupSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    tasks: [taskSchema],
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

var Groups = mongoose.model("Group", groupSchema);
module.exports = Groups;