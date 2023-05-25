const db = require("../models/index");
const userModel = db.user;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  userModel
    .findAll({ limit: 5 })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    //find a user by their email
    const user = await userModel.findOne({
      where: {
        email: email,
      },
    });

    //if user email is found, compare password with bcrypt
    if (user) {
      const isSame = await bcrypt.compare(password, user.password);

      //if password is the same
      //generate token with the user's id and the secretKey in the env file

      if (isSame) {
        let token = jwt.sign({ id: user.id }, "hjdfhkjdlkfmlk", {
          expiresIn: 1 * 24 * 60 * 60 * 1000,
        });

        //if password matches wit the one in the database
        //go ahead and generate a cookie for the user
        res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
        console.log("user", JSON.stringify(user, null, 2));
        console.log(token);
        //send user data
        return res.status(201).send(user);
      } else {
        return res.status(401).send("Password Not Correct!!");
      }
    } else {
      return res.status(401).send("Email does not exist!");
    }
  } catch (error) {
    console.log(error);
  }
};

//register
exports.register = async (req, res) => {
  console.log(req.body, "___________");
  try {
    const { fname, lname, email, password } = req.body;
    const data = {
      fname,
      lname,
      email,
      password: await bcrypt.hash(password, 10),
    };
    //saving the user
    const user = await userModel.create(data);

    //if user details is captured
    //generate token with the user's id and the secretKey in the env file
    // set cookie with the token generated
    if (user) {
      let token = jwt.sign({ id: user.id }, "hjdfhkjdlkfmlk", {
        expiresIn: 1 * 24 * 60 * 60 * 1000,
      });

      res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
      console.log("user", JSON.stringify(user, null, 2));
      console.log(token);
      //send users details
      return res.status(201).send(user);
    } else {
      return res.status(409).send("Details are not correct");
    }
  } catch (error) {
    console.log(error);
  }
};
