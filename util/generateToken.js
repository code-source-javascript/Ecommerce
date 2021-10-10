require("dotenv").config();
const jwt = require("jsonwebtoken");
const { SECRETE, EMPSECRET, ADMINSECRET } = process.env;
module.exports = {
  generateUserToken: async function (user) {
    const token = jwt.sign(user, SECRETE, {
      expiresIn: "1h",
    });
    return token;
  },
  generateEmpToken: async function (emp) {
    const token = jwt.sign(emp, EMPSECRET, {
      expiresIn: "1h",
    });
    return token;
  },
  generateAdminToken: async function (admin) {
    const token = jwt.sign(admin, ADMINSECRET, {
      expiresIn: "1h",
    });
    return token;
  },
};
