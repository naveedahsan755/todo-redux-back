const express = require("express");
const { findById } = require("../db");
const router = express.Router();

const List = require("../db");

// get all todos
router.get("/", async (req, res) => {
  try {
    const id = req.query.id;
    const list = await List.findById(id);
    res.status(200).json({ message: "OK", data: list.todos });
  } catch (err) {
    res.status(500).json({ message: "error", data: [] });
  }
});

// create a todo
router.post("/", async (req, res) => {
  try {
    const { id, title, date, done } = req.body;
    const list = await List.findById(id);
    list.todos.push({ title, date, done });
    await list.save();
    res.status(201).json({ message: "OK", data: list });
  } catch (err) {
    res.status(500).json({ message: "error", data: [] });
  }
});

// update a todo
router.put("/", async (req, res) => {
  try {
    const { id, tid, title, date, done } = req.body;
    const list = await List.findById(id);
    const ind = list.todos.findIndex((t) => t._id == tid);
    list.todos[ind].title = title;
    list.todos[ind].date = date;
    list.todos[ind].done = done;
    await list.save();
    res.status(201).json({ message: "OK", data: list.todos });
  } catch (err) {
    res.status(500).json({ message: "error", data: [] });
  }
});

// delete a todo
router.delete("/", async (req, res) => {
  try {
    const { id, tid } = req.body;
    const list = await List.findById(id);

    const newTodos = list.todos.filter((td) => td._id != tid);
    list.todos = newTodos;
    await list.save();

    res.status(201).json({ message: "OK", data: list.todos });
  } catch (err) {
    res.status(500).json({ message: "error", data: [] });
  }
});

module.exports = router;
