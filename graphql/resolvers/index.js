const userResolver = require("./userResolver");
const productResolver = require("./productResolver");
const employeeResolver = require("./employeeResolve");

module.exports = {
  Query: {
    ...userResolver.Query,
    ...productResolver.Query,
    ...employeeResolver.Query,
  },
  Mutation: {
    ...userResolver.Mutation,
    ...productResolver.Mutation,
    ...employeeResolver.Mutation,
  },
};
