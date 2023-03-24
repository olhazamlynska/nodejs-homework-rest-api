const express = require('express');

const { authController } = require('../../controllers');
const { verifyEmail, resendVerifyEmail } = require('../../services');

const {
  register,
  login,
  getCurrentUser,
  logout,
  updateSubscription,
  updateAvatar,
} = authController;

const { validateBody, auth, upload } = require('../../middlewares');

const { schemas } = require('../../models/user');

const router = express.Router();

router.post('/register', validateBody(schemas.registerSchema), register);

router.get('/verify/:verificationToken', verifyEmail);

router.post('/verify', validateBody(schemas.emailSchema), resendVerifyEmail);

router.get('/login', validateBody(schemas.loginSchema), login);

router.get('/current', auth, getCurrentUser);

router.post('/logout', auth, logout);

router.patch(
  '/',
  auth,
  validateBody(schemas.subscriptionSchema),
  updateSubscription
);

router.patch('/avatars', auth, upload.single('avatar'), updateAvatar);

module.exports = router;
