const jwt = require("jsonwebtoken");

const { SECRETE, EMPSECRET, ADMINSECRET } = require("../config") || process.env;

module.exports = {
  checkUserToken: async function (context) {
    try {
      const AuthHeader = context.req.headers.authorization;
      if (AuthHeader) {
        const user = jwt.verify(AuthHeader, SECRETE);
        return user;
      } else throw new Error("Provide Authorization Header");
    } catch (err) {
      throw new Error(err);
    }
  },
  checkEmpToken: async function (context) {
    try {
      const AuthHeader = context.headers.authorization;
      if (AuthHeader) {
        const emp = jwt.verify(AuthHeader, EMPSECRET);
        return emp;
      } else throw new Error("Provide Authorization Header");
    } catch (err) {
      throw new Error(err);
    }
  },
  checkAdminToken: async function (context) {
    const AuthHeader = context.headers.authorization;
    if (AuthHeader) {
      const admin = jwt.verify(AuthHeader, ADMINSECRET);
      return admin;
    }
  },
};
