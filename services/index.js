const { ctrlWrapper } = require('../helpers');

const resendVerifyEmail = require('./resendVerifyEmail');
const verifyEmail = require('./verifyEmail');

module.exports = {
  verifyEmail: ctrlWrapper(verifyEmail),
  resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
};
