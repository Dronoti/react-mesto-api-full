const express = require('express');
const {
  getAllUsers,
  getUserById,
  updateUserData,
  updateUserAvatar,
  getMyUser,
} = require('../controllers/users');
const {
  updateUserDataIsValid,
  avatarIsValid,
  userIdIsValid,
} = require('../middlewares/validator');

const router = express.Router();

router.get('/', getAllUsers);
router.get('/me', getMyUser);
router.get('/:userId', userIdIsValid, getUserById);
router.patch('/me', express.json(), updateUserDataIsValid, updateUserData);
router.patch('/me/avatar', express.json(), avatarIsValid, updateUserAvatar);

module.exports = router;
