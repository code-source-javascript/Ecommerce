const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  lastName: String,
  firstName: String,
  email: String,
  password: String,
  phone: String,
  image: String,
  orders: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
      createdAt: String,
    },
  ],
  cart: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
      createdAt: String,
    },
  ],
  createdAt: String,
});

module.exports = model("User", userSchema);
