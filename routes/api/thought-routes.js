const router = require('express').Router();

const {
   getAllThought,
   getThoughtById,
   createThought,
   updateThought,
   addReaction,
   removeThought,
   removeReaction
} = require('../../controllers/thought-controller');

// set up GET all and POST at /api/thoughts
router.route('/')
.get(getAllThought)
.post(createThought);

// set up GET one, PUT, and DELETE at /api/thoughts/:id
router.route('/:id')
.get(getThoughtById)
.put(updateThought)
.delete(removeThought);

// set up POST at /api/thoughts/:id/reactions
router.route('/:id/reactions')
.post(addReaction);

// set up DELETE at /api/thoughts/:id/reactions/:reactionId
router.route('/:id/reactions/:reactionId')
.delete(removeReaction);

module.exports = router;