//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

let posts = [];
const homeStartingContent =
  "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent =
  "This is a blog site created by Samip Poudel on June 19,2020 A.D. The site is backed by a NodeJS + ExpressJS server using the MongoDB database. For the front-end, CSS and Bootstrap are used along with EJS templating.";
const contactContent =
  "Mail: sawmeep58@gmail.com Github: SamipPoudel58\n Twitter: @SamipPoudel3\n LinkedIn: Samip Poudel";

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home", { homePosts: posts });
});

app.get("/posts/:topic", (req, res) => {
  posts.forEach((post) => {
    if (_.lowerCase(post.title) === _.lowerCase(req.params.topic)) {
      res.render("post", { postHead: post.title, postContent: post.body });
    }
  });
});

app.get("/about", (req, res) => {
  res.render("about", { firstPara: aboutContent });
});

app.get("/contact", (req, res) => {
  res.render("contact", { firstPara: contactContent });
});

app.get("/compose", (req, res) => {
  res.render("compose");
});

app.post("/compose", (req, res) => {
  let post = {
    title: req.body.postTitle,
    body: req.body.postBody,
  };
  posts.push(post);
  res.redirect("/");
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
