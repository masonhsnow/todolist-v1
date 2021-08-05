const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const newListItems = ["Buy food", "Eat food", "Cook food"];
const workItems = [];

//res.render is an ejs thing that will render certain pages
app.get("/", function (req, res) {
  const day = date.getDay();

  res.render("list", { listTitle: day, newListItems: newListItems });
});

//post results from form
app.post("/", function (req, res) {
  const newListItem = req.body.newItem;

  if (req.body.list === "Work List") {
    workItems.push(newListItem);
    res.redirect("/work");
  } else {
    newListItems.push(newListItem);
    res.redirect("/");
  }
});

//work list
app.get("/work", function (req, res) {
  res.render("list", { listTitle: "Work List", newListItems: workItems });
});

app.post("/work", function (req, res) {
  const item = req.body.newItem;
  workItems.push(item);
  res.redirect("/work");
});

app.get("/about", function (req, res) {
  res.render("about");
});

//listen on port
app.listen(3000, function () {
  console.log("Server started on port 3000");
});
