const { ObjectId } = require('mongoose').Types;
const { Users, Thoughts } = require('../models');

// Aggregate function to get the number of Users overall
const headCount = async () =>
  Users.aggregate()
    .count('UserCount')
    .then((numberOfUsers) => numberOfUsers);

module.exports = {
  // Get all Users
  getAllUsers(req, res) {
    Users.find()
      .then(async (Users) => {
        const UserObj = {
          Users,
          headCount: await headCount(),
        };
        return res.json(UserObj);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Get a single User
  getSingleUser(req, res) {
    Users.findOne({ _id: req.params.UserId })
      .select('-__v')
      .then(async (User) =>
        !User
          ? res.status(404).json({ message: 'No User with that ID' })
          : res.json({
              User,
              grade: await grade(req.params.UserId),
            })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // create a new User
  createNewUser(req, res) {
    Users.create(req.body)
      .then((User) => res.json(User))
      .catch((err) => res.status(500).json(err));
  },
  // Delete a User and remove them from the course
  deleteUser(req, res) {
    Users.findOneAndRemove({ _id: req.params.UserId })
      .then((User) =>
        !User
          ? res.status(404).json({ message: 'No such User exists' })
          : Course.findOneAndUpdate(
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

  // Add an assignment to a User
  createFriend(req, res) {
    console.log('You are adding a reaction');
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
  deleteFriend(req, res) {
    Users.findOneAndUpdate(
      { _id: req.params.UserId },
      { $pull: { friend: { friendId: req.params.friendId } } },
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
};
