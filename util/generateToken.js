const jwt = require("jsonwebtoken");
const { SECRETE } = require("../config");
module.exports = async function (user) {
  const token = await jwt.sign(user, SECRETE, { expiresIn: "1h" });
  return token;
};
