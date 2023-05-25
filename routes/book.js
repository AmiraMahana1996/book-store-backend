module.exports = (app) => {
  const book = require("../controllers/book");

  var router = require("express").Router();

  // Retrieve all Tutorials
  // router.get("/", user.findAll);
  router.post("/add", book.create);
  router.put("/edit", book.update);
  router.get("/all", book.findAll);

  app.use("/api/books", router);
};
