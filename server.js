const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;
const PASSWORD = "Eselchen";

let notes = Array(10).fill("");
if (fs.existsSync("notes.json")) {
  notes = JSON.parse(fs.readFileSync("notes.json", "utf-8"));
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/login", (req, res) => {
  if (req.body.password === PASSWORD) {
    res.redirect("/library");
  } else {
    res.send("Falsches Passwort.");
  }
});

app.get("/library", (req, res) => {
  res.render("library", { notes });
});

app.post("/save", (req, res) => {
  notes = req.body.notes;
  fs.writeFileSync("notes.json", JSON.stringify(notes));
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});
