const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const PASSWORD = "geheim";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/login", (req, res) => {
  const password = req.body.password;
  if (password === PASSWORD) {
    res.render("library");
  } else {
    res.send("Falsches Passwort. <a href='/'>Zurück</a>");
  }
});

const listener = app.listen(process.env.PORT, () => {
  console.log("App läuft auf Port " + listener.address().port);
});
