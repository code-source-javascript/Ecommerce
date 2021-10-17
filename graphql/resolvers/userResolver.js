const bcrypt = require("bcryptjs");
const { UserInputError } = require("apollo-server");
const User = require("../../model/User");
const Product = require("../../model/Product");
const { generateUserToken } = require("../../util/generateToken");
const { validateCreateUser } = require("../../util/validators");
const { checkUserToken, checkAdminToken } = require("../../util/checkAuth");
const Admin = require("../../model/Admin");

module.exports = {
  Query: {
    getUsers: async function (_, args, context, info) {
      try {
        const admin = await checkAdminToken(context);
        const _admin = Admin.findOne({ username: admin.username });
        if (_admin) {
          const users = await User.find();
          if (users) {
            return users;
          } else {
            throw new Error(err);
          }
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
    login: async function (_, { email, password }) {
      try {
        const user = await User.findOne({ email: email });
        if (user) {
          const compare = await bcrypt.compare(password, user.password);
          if (!compare) throw new Error("Incorrect password");
          const token = generateUserToken({
            email: user.email,
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
          address,
        },
      },
      context
    ) {
      try {
        const { errors, isEmpty } = validateCreateUser({
          lastName,
          firstName,
          email,
          phone,
          password,
          confirmPassword,
        });
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
          address,
          password: hashPassword,
          createdAt: new Date(),
        });

        const res = await newUser.save();
        const token = generateUserToken({
          id: res._id,
          email,
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
        const _user = await User.findByIdAndDelete(id);
        return _user;
      } else throw new Error("User Not Available");
    },
    addToCart: async function (_, { id, variation }, context) {
      try {
        const user = await checkUserToken(context);
        if (user) {
          const product = await Product.findById(id);
          if (product) {
            const cartUser = await User.findById(user.id);
            if (cartUser) {
              cartUser.cart.unshift({
                product: product._id,
                name: product.name,
                seller: product.seller,
                shipping: product.shipping,
                variation,
                unitPrice: product.price,
                createdAt: new Date(),
              });
              const res = await cartUser.save();
              return res;
            } else throw new Error("User not found");
          } else throw new Error("Product is not available");
        } else throw new Error("You must be authorized");
      } catch (err) {
        throw new Error(err);
      }
    },
    orderItem: async function (_, { id, station }, context) {
      try {
        const user = await checkUserToken(context);
        if (user) {
          const _user = await User.findById(user.id);
          _user.orders.unshift({
            cartId: id,
            station,
            status: "PENDING",
            createdAt: new Date(),
          });
          _user.cart.filter((cart) => cart.cartId == id);
          const res = await _user.save();
          return res;
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
