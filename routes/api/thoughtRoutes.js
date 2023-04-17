const router = require ('express').Router();
const {
    getAllThoughts,
    getSingleThought,
    createNewThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction,  
} = require('../../controllers/thoughtController');

// **`/api/thoughts`get all**
router 
.route('/')
.get(getAllThoughts)
.post(createNewThought);

// **`/api/thoughts/:thoughtId` get single thought by id**
router
.route('/:thoughtId')
.get(getSingleThought)
.put(updateThought)
.delete(deleteThought);

// **`/api/thoughts/:thoughtId/reactions`**
router
.route('/:thoughtId/reactions')
.post(addReaction);

// **`/api/thoughts/:thoughtId/reactions/:reactionId`**
router
.route('/:thoughtId/reactions/:reactionId')
.delete(removeReaction);

module.exports = router;