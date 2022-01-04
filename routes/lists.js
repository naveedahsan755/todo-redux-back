const express = require("express");
const router = express.Router();

const List = require("../db");

// get all lists
router.get("/", async (req, res) => {
  try {
    const lists = await List.find({});
    res.status(200).json({ message: "OK", data: lists });
  } catch (err) {
    res.status(500).json({ message: "error", data: [] });
  }
});

// create a list
router.post("/", async (req, res) => {
  try {
    const name = req.body.name;
    const list = new List({ name, todos: [] });
    await list.save();
    res.status(201).json({ message: "OK", data: list });
  } catch (err) {
    res.status(500).json({ message: "error", data: [] });
  }
});

// update a list
router.put("/", async (req, res) => {
  try {
    const { id, name } = req.body;
    const list = await List.findById(id);
    list.name = name;
    await list.save();
    res.status(201).json({ message: "OK", data: list });
  } catch (err) {
    res.status(500).json({ message: "error", data: [] });
  }
});

// delete a list
router.delete("/", async (req, res) => {
  try {
    const id = req.body.id;
    // const list = await List.findById(id);
    // if (!list) {
    //   throw new Error("List not found");
    // }
    await List.deleteOne({ _id: id });
    res.status(201).json({ message: "OK", data: [] });
  } catch (err) {
    res.status(500).json({ message: "error", data: [] });
  }
});

module.exports = router;
