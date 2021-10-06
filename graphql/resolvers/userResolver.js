const bcrypt = require("bcryptjs");
const { UserInputError } = require("apollo-server");
const User = require("../../model/User");
const generateToken = require("../../util/generateToken");
const { validateCreateUser } = require("../../util/validators");
module.exports = {
  Query: {
    getUsers: async function (_, args, context, info) {
      try {
        const users = await User.find();
        if (users) {
          return users;
        } else {
          throw new Error(err);
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    getUser: async function (_, { id }, context) {
      try {
        const user = await User.findById(id);
        if (user) {
          return user;
        } else throw new Error("User not found");
      } catch (err) {
        throw new Error(err);
      }
    },
    login: async function (_, { input: { email, password } }) {
      try {
        const user = await User.findOne({ email: email });
        if (user) {
          const compare = await bcrypt.compare(password, user.password);
          if (!compare) throw new Error("Incorrect password");
          const token = generateToken({
            lastName: user.lastName,
            firstName: user.firsName,
            email: user.email,
            phone: user.phone,
            image: user.image,
            id: user._id,
          });
          return {
            ...user._doc,
            id: user._id,
            token,
          };
        } else throw new Error("User not found");
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
        const { errors, isEmpty } = validateCreateUser(
          ({
            lastName,
            firstName,
            email,
            phone,
            password,
            confirmPassword,
          })
        );
        if (!isEmpty) {
          throw new UserInputError("User Input Error", {
            ...errors,
          });
        }
        const user = await User.findOne({ email: email });
        if (user) {
          throw new Error("Email already exist");
        }
        const hashPassword = await bcrypt.hash(password, 12);
        const newUser = await new User({
          lastName,
          firstName,
          email,
          phone,
          image,
          password: hashPassword,
          createdAt: new Date(),
        });

        const res = await newUser.save();
        const token = generateToken({
          lastName,
          firstName,
          email,
          phone,
          image,
          id: res._id,
        });
        return {
          ...res._doc,
          id: res._id,
          token,
        };
      } catch (err) {
        throw new Error(err);
      }
    },
    deleteUser: async function (_, { id }) {
      const user = await User.findOne({ _id: id });
      if (user) {
        await User.findByIdAndDelete(id);
        const users = await User.find();
        return users;
      } else throw new Error("User Not Available");
    },
  },
};
