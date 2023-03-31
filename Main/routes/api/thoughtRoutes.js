const router = require ('express').Router();
const {
    getAllThoughts,
    getSingleThought,
    createNewThought,
    updateThought,
    removeThought,
    createReaction,
    removeReaction,
} = require('../../controllers/?filename');

// **`/api/thoughts`**

// **`/api/thoughts/:thoughtId`**

// **`/api/thoughts/:thoughtId/reactions`**

// **`/api/thoughts/:thoughtId/reactions/:reactionId`**

module.exports = router