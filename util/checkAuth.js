const jwt = require("jsonwebtoken");

const { SECRETE } = require("../config");

module.exports = async function (context) {
  try {
    const AuthHeader = context.req.headers.authorization;
    if (AuthHeader) {
      const user = jwt.verify(AuthHeader, SECRETE);
      return user;
    } else throw new Error("Provide Authorization Header");
  } catch (err) {
    throw new Error(err);
  }
};
