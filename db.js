const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://naveed:naveedahsan4854@cluster0.rzvjr.mongodb.net/toDo?retryWrites=true&w=majority"
);

module.exports = mongoose.model("List", {
  name: String,
  todos: [{ title: String, date: Date, done: Boolean }],
});
