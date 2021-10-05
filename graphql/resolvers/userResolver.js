const User = require("../../model/User");

module.exports = {
  Query: {
    getUsers: async function () {
      try {
        const users = await User.find();
        return users;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    createUser: async function (
      _,
      {
        input: {
          lastName,
          firstName,
          email,
          phone,
          password,
          confirmPassword,
          image,
        },
      },
      context
    ) {
      try {
        

      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
