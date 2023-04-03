const { ObjectId } = require('mongoose').Types;
const { Users, Thoughts } = require('../models');

// Aggregate function to get the number of Users overall
// const headCount = async () =>
//   Users.aggregate()
//     .count('UserCount')
//     .then((numberOfUsers) => numberOfUsers);

const userController = {
  // Get all Users
  getAllUsers(req, res) {
    Users.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  //get a single user
  getSingleUser(req, res) {
    Users.findOne({ _id: req.params.userId })
    .then((user) =>
    !user
      ? res.status(404).json({ message: 'No user with that ID' })
      : res.json(user)
  )
  .catch((err) => res.status(500).json(err));
},
  // create a new user
  createNewUser(req, res) {
    Users.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
 
  // Delete a User and remove all thoughts
  deleteUser(req, res) {
    Users.findOneDelete({ _id: req.params.UserId })
      .then((User) =>
        !User
          ? res.status(404).json({ message: 'No such User exists' })
          : Thoughts.findOneAndUpdate(
              { Users: req.params.UserId },
              { $pull: { Users: req.params.UserId } },
              { new: true }
            )
      )
      .then((thought) =>
        !thought
          ? res.status(404).json({
              message: 'User deleted, but no thoughts found',
            })
          : res.json({ message: 'User successfully deleted' })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  updateUser(req, res) {
    Users.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) => {
      if (!user) {
          return res.status(404).json({ message: 'No user with this id!' })
       }
        res.json(user);
    })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  // Add a friend to a User
  addFriend(req, res) {
    console.log('You are adding a friend');
    console.log(req.body);
    Users.findOneAndUpdate(
      { _id: req.params.UserId },
      { $addToSet: { friend: req.body } },
      { runValidators: true, new: true }
    )
      .then((User) =>
        !User
          ? res
              .status(404)
              .json({ message: 'No User found with that ID :(' })
          : res.json(User)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Remove assignment from a User
  removeFriend(req, res) {
    Users.findOneAndUpdate(
      { _id: req.params.UserId },
      { $pull: { friend: { friendId: req.params.friendId } } },
      { runValidators: true, new: true }
    )
      .then((user) => {
      if (!user) {
        return res.status(404).json({ message: 'No user with this id!' })
      }
      res.json(user);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });  
},
};
module.exports = userController