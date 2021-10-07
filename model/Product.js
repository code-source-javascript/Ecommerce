const { model, Schema } = require("mongoose");

const productSchema = new Schema({
  name: String,
  brand: String,
  price: Number,
  variation: [String],
  quantity: Number,
  category: String,
  discount: Number,
  details: String,
  features: [
    {
      name: String,
      value: String,
      keyValue: Boolean,
    },
  ],
  specifications: [
    {
      name: String,
      value: String,
    },
  ],
  boxItem: [String],
  feedback: [
    {
      userID: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      body: String,
      rating: Number,
      createdAt: String,
    },
  ],
  picture: [String],
});

module.exports = model("Product", productSchema);
