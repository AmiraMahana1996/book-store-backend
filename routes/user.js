module.exports = (app) => {
  const user = require("../controllers/user");

  var router = require("express").Router();

  // Retrieve all Tutorials
  router.get("/", user.findAll);
  router.post("/register", user.register);
  router.post("/login", user.login);

  app.use("/api/users", router);
};
