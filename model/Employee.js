const { model, Schema } = require("mongoose");

const employeeSchema = new Schema({
  employeeId: String,
  lastName: String,
  firstName: String,
  email: String,
  phone: String,
  address: {
    country: String,
    city: String,
    street: String,
  },
  position: String,
  image: String,
  password: String,
});

module.exports = model("Employee", employeeSchema);
