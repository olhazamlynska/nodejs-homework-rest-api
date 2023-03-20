const { User } = require('../../models');
const { HttpError } = require('../../helpers');

const updateSubscription = async (req, res) => {
  const { _id } = req.user;
  const result = await User.findByIdAndUpdate(_id, req.body, { new: true });

  if (!result) {
    throw HttpError(404, 'Not found');
  }

  res.json({
    status: 'success',
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = updateSubscription;
