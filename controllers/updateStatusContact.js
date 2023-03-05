const { Contact } = require('../models/contact');

const { HttpError } = require('../helpers');

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, {
    new: true,
  });
  if (!result) {
    throw HttpError(400, 'Not found');
  }
  res.json(result);
};

module.exports = updateStatusContact;
