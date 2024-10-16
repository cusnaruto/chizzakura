const createUser = (req, res) => {
  //process data here
  res.send("Hello World! hello  world");
};

const findUserByUsername = (req, res) => {
  res.render("sample.ejs");
};

module.exports = {
  createUser,
  findUserByUsername,
};
