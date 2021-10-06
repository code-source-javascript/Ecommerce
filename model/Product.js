const { model, Schema } = require("mongoose");

const productSchema = new Schema({
  name: String,
  brand: String,
  price: Number,
  features: String,
  quantity: Number,
  category: String,
  specification: {
    country: String,
    weight: String,
    color: [String],
    material: [String],
  },
  feedback: {
    body: String,
    rating: Number,
  },
  picture: [String],
});

module.exports = model("Product", productSchema);
