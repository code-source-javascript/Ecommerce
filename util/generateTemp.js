module.exports = function () {
  const temporaryPassword = Math.floor(1000000 * Math.random());
  const password = temporaryPassword.toString();
  return password;
};
