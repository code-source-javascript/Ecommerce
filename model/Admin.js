const { model, Schema } = require("mongoose");

const adminSchema = new Schema({
  username: String,
  password: String,
});

module.exports = model("Admin", adminSchema);
