const express = require("express");
const app = express();
const cors = require("cors");

var corsOptions = {
  origin: "http://localhost:3001",
};
app.use(cors(corsOptions));

app.use(cors());
app.use(express.urlencoded({ extended: true }));



app.use(express.json());

// routes
require("./routes/RedeemingCodes")(app);
require("./routes/user")(app);
require("./routes/book")(app);

//database connection
const db = require("./models/index");
db.sequelize
  .sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

// var SequelizeAuto = require("sequelize-auto");
// var auto = new SequelizeAuto("Developer", "sa", "allah_karem!1", {
//   host: "172.1.100.156",
//   port: "1433",
//   dialect: "mssql",
//   tables: ["userBooks"],
// });

// auto.run(function (err) {
//   if (err) throw err;
// });

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});
