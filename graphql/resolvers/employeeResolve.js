const Employee = require("../../model/Employee");
const { generateEmpToken } = require("../../util/generateToken");
const bcrypt = require("bcryptjs");
module.exports = {
  Query: {
    loginEmployee: async function (_, { employeeId, password }) {
      try {
        const emp = await Employee.findOne({ employeeId: employeeId });
        if (emp) {
          const compare = bcrypt.compare(emp.password, password);
          if (compare) {
            const token = generateEmpToken({
              id: emp._id,
              employeeId: emp.employeeId,
              lastName: emp.lastName,
              firstName: emp.firstName,
              email: emp.email,
              phone: emp.phone,
              address: emp.address,
              position: emp.position,
              image: emp.image,
            });
            return {
              ...emp._doc,
              id: emp._id,
              token: token,
            };
          }
        } else throw new Error("Employee not found");
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    createEmployee: async function (_, { input }, context) {
      try {
        // make sure the person creating employee is the admin
        // create random password, send to user throw text message or email to employee and allow him/her change it
        // hash that password
        const employee = new Employee({
          ...input,
        });
        const res = await employee.save();
        return res;
      } catch (err) {
        throw new Error(errr);
      }
    },
  },
};
