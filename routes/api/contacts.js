const express = require('express');

const { contactsController } = require('../../controllers');

const {
  getAll,
  getById,
  addContact,
  removeContact,
  updateContactById,
  updateStatusContact,
} = contactsController;

const { validateBody, isValidId, auth } = require('../../middlewares');

const { schemas } = require('../../models/contact');

const router = express.Router();

router.get('/', auth, getAll);

router.get('/:contactId', auth, isValidId, getById);

router.post('/', auth, validateBody(schemas.addSchema), addContact);

router.delete('/:contactId', auth, isValidId, removeContact);

router.put(
  '/:contactId',
  auth,
  isValidId,
  validateBody(schemas.addSchema),
  updateContactById
);
router.patch(
  '/:contactId/favorite',
  auth,
  isValidId,
  validateBody(schemas.updateSchema),
  updateStatusContact
);

module.exports = router;
