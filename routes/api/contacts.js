const express = require('express');

const {
  getAll,
  getById,
  addContact,
  removeContact,
  updateContactById,
  updateStatusContact,
} = require('../../controllers');

const { validateBody, isValidId } = require('../../middlewares');

const { schemas } = require('../../models/contact');

const router = express.Router();

router.get('/', getAll);

router.get('/:contactId', isValidId, getById);

router.post('/', validateBody(schemas.addSchema), addContact);

router.delete('/:contactId', isValidId, removeContact);

router.put(
  '/:contactId',
  isValidId,
  validateBody(schemas.addSchema),
  updateContactById
);
router.patch(
  '/:contactId/favorite',
  isValidId,
  validateBody(schemas.updateSchema),
  updateStatusContact
);

module.exports = router;
