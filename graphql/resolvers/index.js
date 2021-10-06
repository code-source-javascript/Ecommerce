const userResolver = require("./userResolver");
const productResolver = require("./productResolver");

module.exports = {
  Query: {
    ...userResolver.Query,
    ...productResolver.Query,
  },
  Mutation: {
    ...userResolver.Mutation,
    ...productResolver.Mutation,
  },
};
