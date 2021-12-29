const express = require("express");
const cors = require("cors");

const lists = require("./routes/lists");
const todos = require("./routes/todos");

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("To do list app api is working.");
});

app.use("/api/lists", lists);
app.use("/api/todos", todos);

// page not found
app.get("*", async (req, res) => {
  res.status(401).json({ message: "Not Found", data: [] });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
