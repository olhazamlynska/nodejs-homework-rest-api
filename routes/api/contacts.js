const express = require('express');

const {
  getAll,
  getById,
  addContact,
  removeContact,
  updateContactById,
} = require('../../controllers');

const { validateBody } = require('../../middlewares');

const { addSchema } = require('../../schemas');

const router = express.Router();

router.get('/', getAll);

router.get('/:contactId', getById);

router.post('/', validateBody(addSchema), addContact);

router.delete('/:contactId', removeContact);

router.put('/:contactId', validateBody(addSchema), updateContactById);

module.exports = router;
