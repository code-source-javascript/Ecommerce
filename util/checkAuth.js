require("dotenv").config();
const jwt = require("jsonwebtoken");
const { AuthenticationError } = require("apollo-server");
const { SECRETE, EMPSECRET, ADMINSECRET } = process.env;

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
      const AuthHeader = context.req.headers.authorization;
      if (!AuthHeader) {
        throw new AuthenticationError("Provide Authorization Header");
      }
      const emp = jwt.verify(AuthHeader, EMPSECRET);
      return emp;
    } catch (err) {
      throw new Error(err);
    }
  },

  checkAdminToken: async function (context) {
    try {
      const AuthHeader = context.req.headers.authorization;
      if (AuthHeader) {
        const admin = jwt.verify(AuthHeader, ADMINSECRET);
        return admin;
      } else throw new Error("Provide Authorization Header");
    } catch (err) {
      throw new Error(err);
    }
  },
};
