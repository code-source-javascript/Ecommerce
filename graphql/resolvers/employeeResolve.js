const bcrypt = require("bcryptjs");

const Employee = require("../../model/Employee");
const Admin = require("../../model/Admin");

const {
  generateEmpToken,
  generateAdminToken,
} = require("../../util/generateToken");
const { checkAdminToken, checkEmpToken } = require("../../util/checkAuth");
const generateTemp = require("../../util/generateTemp");
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
          } else throw new Error("Incorrect Password");
        } else throw new Error("Employee not found");
      } catch (err) {
        throw new Error(err);
      }
    },
    loginAdmin: async function (_, { username, password }) {
      try {
        const admin = await Admin.findOne({ username: username });
        if (admin) {
          const token = generateAdminToken({
            username,
          });
          return {
            id: admin._id,
            username,
            token,
          };
        } else throw new Error("Admin Account Doesn't Exist");
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    createEmployee: async function (_, { input }, context) {
      try {
        const admin = await checkAdminToken(context);
        if (admin) {
          const coAdmin = Admin.findOne({ username: admin.username });
          if (coAdmin) {
            const oldEmp = await Employee.findOne({
              employeeId: input.employeeId,
            });
            const oldEmployee = await Employee.findOne({ email: input.email });
            if (oldEmp || oldEmployee) {
              throw new Error("Employee Already Exist");
            } else {
              const tempPassword = generateTemp();

              const hash = await bcrypt.hash(tempPassword, 12);
              const employee = new Employee({
                ...input,
                password: hash,
              });
              const res = await employee.save();
              console.log(
                `This message is to be sent as SMS ... Temporary Password is ${tempPassword}`
              );
              return res;
            }
          } else throw new Error("Administrator doesn't exist");
        } else throw new Error("Administrator must authenticate");
      } catch (err) {
        throw new Error(err);
      }
    },
    changePassword: async function (
      _,
      { input: { employeeId, oldPassword, newPassword, confirmPassword } }
    ) {
      try {
        const employee = await Employee.findOne({ employeeId: employeeId });
        if (employee) {
          const old = await bcrypt.compare(oldPassword, employee.password);
          if (old) {
            if (newPassword === confirmPassword) {
              employee.password = await bcrypt.hash(newPassword, 12);
              const res = await employee.save();
              return res;
            } else
              throw new Error(
                "Confirm Password and New Password must be the same"
              );
          } else throw new Error("Wrong Old Password");
        } else throw new Error("User doesn't exist");
      } catch (err) {
        throw new Error(err);
      }
    },
    createAdmin: async function (_, { username, password }) {
      try {
        const _admin = await Admin.findOne({ username: username });
        if (_admin) {
          throw new Error("User already exist");
        }
        if (username === "user@admin.mail") {
          const hashPassword = await bcrypt.hash(password, 12);
          const admin = new Admin({
            username,
            password: hashPassword,
          });
          const res = await admin.save();
          return res;
        } else throw new Error("You can't create a new account for admin");
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
