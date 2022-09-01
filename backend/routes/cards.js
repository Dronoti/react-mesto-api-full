const express = require('express');
const {
  createCard,
  getAllCards,
  deleteCardById,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');
const {
  createCardIsValid,
  cardIdIsValid,
} = require('../middlewares/validator');

const router = express.Router();

router.get('/', getAllCards);
router.post('/', express.json(), createCardIsValid, createCard);
router.delete('/:cardId', cardIdIsValid, deleteCardById);
router.put('/:cardId/likes', cardIdIsValid, likeCard);
router.delete('/:cardId/likes', cardIdIsValid, dislikeCard);

module.exports = router;
