const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.get("/", (req, res) => {
  fs.readdir(`./files`, (err, files) => {
    res.render("index", { files: files });
  });
});

app.get("/file/:filename", (req, res) => {
  fs.readFile(`./files/${req.params.filename}`, "utf-8", (err, filedata) => {
    res.render("show", { filename: req.params.filename, filedata: filedata });
  });
});

app.get("/edit/:filename", (req, res) => {
  res.render("edit", { filename: req.params.filename });
});

app.post("/edit", (req, res) => {
  //console.log(req.body.previous + " " + req.body.new);
  fs.rename(
    `./files/${req.body.previous}`,
    `./files/${req.body.new}`,
    (err) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect("/");
      }
    }
  );
});
app.post("/create", (req, res) => {
  fs.writeFile(
    `./files/${req.body.title.split(" ").join("")}.txt`,
    `${req.body.details}`,
    (err) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect("/");
      }
    }
  );
});
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
