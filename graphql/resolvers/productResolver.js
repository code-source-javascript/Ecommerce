const Product = require("../../model/Product");
const { checkEmpToken } = require("../../util/checkAuth");
module.exports = {
  Query: {
    getProducts: async function () {
      try {
        const products = await Product.find();
        return products;
      } catch (err) {
        throw new Error(err);
      }
    },
    getProduct: async function (_, { id }) {
      try {
        const product = await Product.findById(id);
        if (product) {
          return product;
        }
        throw new Error("Product Unavailable");
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    addNewProduct: async function (
      _,
      {
        input: {
          name,
          brand,
          category,
          price,
          quantity,
          features,
          specifications,
          picture,
          shipping,
          boxItem,
          discount,
          seller,
          details,
          variation,
        },
      },
      context
    ) {
      try {
        const employee = await checkEmpToken(context);
        if (employee) {
          const product = await Product.findOne({ name: name });
          if (product) {
            if (product.seller === seller && product.brand === brand) {
              throw new Error(
                "Item Is Already Available For Seller, Hence Find Product And Update"
              );
            }
          }
          const newProduct = await new Product({
            name,
            brand,
            category,
            price,
            quantity,
            features,
            specifications,
            picture,
            shipping,
            boxItem,
            discount,
            seller,
            details,
            variation,
          });

          const res = await newProduct.save();
          return res;
        }
        throw new Error("You must be login");
      } catch (err) {
        throw new Error(err);
      }
    },
    updateProduct: async function (_, { product, id }, context) {
      try {
        const employee = await checkEmpToken(context);
        if (employee) {
          const updateProduct = await Product.findByIdAndUpdate(id, product);
          return updateProduct;
        } else throw new Error("User must be authenticate");
      } catch (err) {
        throw new err();
      }
    },
    updateQuantity: async function (_, { id, quantity }, context) {
      try {
        const employee = await checkEmpToken(context);
        if (employee) {
          const product = await Product.findById(id);
          product.quantity += quantity;
          const res = await product.save();

          return res;
        } else throw new Error("User is must login");
      } catch (err) {
        throw new Error(err);
      }
    },
    updateDiscount: async function (_, { id, discount }) {
      try {
        const employee = await checkEmpToken(context);
        if (employee) {
          const product = await Product.findById(id);
          product.discount = discount;
          const res = await product.save();

          return res;
        } else throw new Error("User is must login");
      } catch (err) {
        throw new Error(err);
      }
    },
    deleteProduct: async function (_, { id }, context) {
      try {
        const employee = await checkEmpToken(context);
        if (employee) {
          const product = await Product.findByIdAndDelete(id);
          return product;
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
