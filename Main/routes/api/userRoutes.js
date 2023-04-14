const router = require ('express').Router();
const {
    getAllUsers,
    getSingleUser,
    createNewUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend,
} = require('../../controllers/userController');
 
// **`/api/users`**
router
.route('/')
.get(getAllUsers)
.post(createNewUser);

// **`/api/users/:userId` get single, update, or delete user by id**
router
.route('/:userId')
.get(getSingleUser)
.put(updateUser)
.delete(deleteUser);

// **`/api/users/:userId/friends`**
router
.route('/:userId/friends')
.post(addFriend)

// **`/api/users/:userId/friends/:friendId`**
router
.route('/:userId/friends/:friendId')
.delete(removeFriend);

module.exports = router