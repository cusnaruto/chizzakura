const connection = require("../config/databaseConnection");

const createUser = (req, res) => {
  //process data here
  console.log(">> ", req.body);
  res.send(req.body);
};

const findUserByUsername = (req, res) => {
  //test the database connection
  let items = [];
  connection.query(
    "SELECT * FROM chizzakura.items;",
    function (err, rows, fields) {
      if (err) throw err;
      items = rows;
      res.render("sample.ejs", { items: items });
    }
  );
};

module.exports = {
  createUser,
  findUserByUsername,
};
