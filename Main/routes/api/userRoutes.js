const router = require ('express').Router();
const {
    getAllUsers,
    getSingleUser,
    createNewUser,
    updateUser,
    removeUser,
    createFriend,
    removeFriend,
} = require('../../controllers/?filename');
 

// **`/api/users`**

// **`/api/users/:userId`**

// **`/api/users/:userId/friends`**

// **`/api/users/:userId/friends/:friendId`**


module.exports = router