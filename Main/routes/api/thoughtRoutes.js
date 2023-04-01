const router = require ('express').Router();
const {
    getAllThoughts,
    getSingleThought,
    createNewThought,
    updateThought,
    removeThought,
    createReaction,
    removeReaction,
} = require('../../controllers/thoughtcontroller');

// **`/api/thoughts`get all**
router.route('/').get(getAllThoughts).post(createNewThought);
// **`/api/thoughts/:thoughtId` get single thought by id**
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(removeThought);
// **`/api/thoughts/:thoughtId/reactions`**
router.route('/:thoughtId/reactions').post(createReaction);
// **`/api/thoughts/:thoughtId/reactions/:reactionId`**
router.route('/:thoughtId/reactions/:reaction/Id').delete(removeReaction);

module.exports = router