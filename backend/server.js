const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const pool = require("./db");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Book API is running");
});

app.get("/books", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM books");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching books");
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
app.post("/books", async (req, res) => {
  try {

    const { title, author, genre, publication_year } = req.body;

    const result = await pool.query(
      "INSERT INTO books(title, author, genre, publication_year) VALUES($1,$2,$3,$4) RETURNING *",
      [title, author, genre, publication_year]
    );

    res.json(result.rows[0]);

  } catch (error) {
    console.error(error);
    res.status(500).send("Error adding book");
  }
});
app.put("/books/:id", async (req, res) => {
  try {

    const id = req.params.id;
    const { title, author, genre, publication_year } = req.body;

    const result = await pool.query(
      "UPDATE books SET title=$1, author=$2, genre=$3, publication_year=$4 WHERE id=$5 RETURNING *",
      [title, author, genre, publication_year, id]
    );

    res.json(result.rows[0]);

  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating book");
  }
});