const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  lastName: String,
  firstName: String,
  email: String,
  password: String,
  phone: String,
  image: String,
  address: {
    country: String,
    street: String,
    city: String,
  },
  orders: [
    {
      cartId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
      station: String,
      status: String,
      createdAt: String,
    },
  ],
  cart: [
    {
      cartId: Schema.Types.ObjectId,
      product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
      name: String,
      createdAt: String,
      quantity: Number,
      shipping: String,
      unitPrice: Number,
      seller: String,
    },
  ],
  createdAt: String,
});

module.exports = model("User", userSchema);
