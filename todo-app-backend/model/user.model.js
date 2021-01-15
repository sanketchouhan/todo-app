const mongoose = require("mongoose");

var toDoUsersSchema = new mongoose.Schema({
    name: {
        type: String,
        default: ''
    },
    password: {
        type: String,
        default: ''
    }
});

var ToDoUsers = mongoose.model("ToDoUser", toDoUsersSchema);
module.exports = ToDoUsers;