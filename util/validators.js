module.exports = {
  validateCreateUser: function (user) {
    const errors = {};
    const regEx =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (user.firstName.trim() === "") {
      errors.firstName = "Firstname field is required";
    }
    if (user.lastName.trim() === "") {
      errors.lastName = "Lastname field is required";
    }
    if (user.email.trim() === "") {
      errors.email = "Email field is required";
    }
    if (!regEx.test(String(user.email).toLowerCase())) {
      errors.email = "Email is invalid";
    }
    if (user.password.trim() === "") {
      errors.password = "Password field is required";
    }
    if (user.confirmPassword.trim() === "") {
      errors.confirmPassword = "Confrim password field is required";
    }
    if (user.confirmPassword !== user.password) {
      errors.confirmPassword = "Password doesn't match";
    }
    if (user.phone.trim() === "") {
      errors.phone = "Phone field is required";
    }

    return {
      errors,
      isEmpty: Object.keys(errors).length <= 0,
    };
  },
};
