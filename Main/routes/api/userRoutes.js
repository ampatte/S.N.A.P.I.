const router = require ('express').Router();
const {
    getAllUsers,
    getSingleUser,
    createNewUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend,
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
.route('/:userId/Friends')
.post(addFriend);

// **`/api/users/:userId/friends/:friendId`**
router
.route('/:userId/Friends/:Friend/Id')
.delete(deleteFriend);


module.exports = router