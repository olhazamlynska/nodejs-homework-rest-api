const express = require('express');

const { authController } = require('../../controllers');

const { register, login, getCurrentUser, logout, updateSubscription } =
  authController;

const { validateBody, auth } = require('../../middlewares');

const { schemas } = require('../../models/user');

const router = express.Router();

router.post('/register', validateBody(schemas.registerSchema), register);

router.get('/login', validateBody(schemas.loginSchema), login);

router.get('/current', auth, getCurrentUser);

router.post('/logout', auth, logout);

router.patch(
  '/',
  auth,
  validateBody(schemas.subscriptionSchema),
  updateSubscription
);

module.exports = router;
