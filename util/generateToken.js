const jwt = require("jsonwebtoken");
const { SECRETE, EMPSECRET } = require("../config");
module.exports = {
  generateUserToken: async function (user) {
    const token = jwt.sign(user, SECRETE, { expiresIn: "1h" });
    return token;
  },
  generateEmpToken: async function (emp) {
    const token = jwt.sign(emp, EMPSECRET, { expiresIn: "1h" });
    return token;
  },
};
