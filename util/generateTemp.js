module.exports = function () {
  const temporaryPassword = Math.floor(1000000 * Math.random()).toString;
  return temporaryPassword;
};
