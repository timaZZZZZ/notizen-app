const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Passwort für Zugriff
const PASSWORD = "geheim";

// Versuche, gespeicherte Notizen zu laden
let notes = Array(10).fill("");
try {
  if (fs.existsSync("notes.json")) {
    notes = JSON.parse(fs.readFileSync("notes.json", "utf-8"));
  }
} catch (err) {
  console.log("Fehler beim Laden der Notizen:", err);
}

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Startseite mit Passwortfeld
app.get("/", (req, res) => {
  res.render("index");
});

// POST für Passwortprüfung
app.post("/login", (req, res) => {
  const input = req.body.password;
  if (input === PASSWORD) {
    res.redirect("/library");
  } else {
    res.send("Falsches Passwort.");
  }
});

// Bibliothek mit Notizen anzeigen
app.get("/library", (req, res) => {
  res.render("library", { notes });
});

// Speichern der Notizen
app.post("/save", (req, res) => {
  notes = req.body.notes;
  fs.writeFileSync("notes.json", JSON.stringify(notes));
  res.sendStatus(200);
});

// Server starten
app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});
