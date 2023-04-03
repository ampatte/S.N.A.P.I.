const { Users, Thoughts} =require('../models');

const thoughtController = {
  // Get all thoughts
  getAllThoughts(req, res) {
    Thoughts.find()
      .sort({createdAt: -1})
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  // Get a thought
  getSingleThought(req, res) {
    Thoughts.findOne({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create a thought
  createNewThought(req, res) {
    Thoughts.create(req.body)
      .then((thought) => {
      return User.findOneAndUpdate(
        { _id: req.body.userId },
        { $addToSet: { thoughts: thought._id } },
        { new: true }
      );
    })
    .then((user) =>
      !user
        ? res.status(404).json({
            message: 'Thought created, but found no user with that ID'
          })
        : res.json('Created the thought 🎉')
    )
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
  },
  // Delete a thought
  deleteThought(req, res) {
    Thoughts.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) => {
      if (!thought) {
          return res.status(404).json({ message: 'No thought with that ID' })
      }
      return User.findOneAndUpdate(
        { thoughts: req.params.thoughtId },
        { $pull: { thoughts:req.params.thoughtId } },
        {new: true }
      );
    })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: 'Thought created but no user with that ID'})
      }
    }) 
  },
  // Update a thought
  updateThought(req, res) {
    Thoughts.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) => {
      if (!thought) {
          return res.status(404).json({ message: 'No thought with this id!' })
       }
        res.json(thought);
    })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  //add a reaction to a thought
  addReaction(req, res) {
    Thoughts.findOneAndUpdate(
      { _id:req.params.thoughtId },
      { $addToSet: {reations:req.body } },
      { runValidators: true, new: true }
    )
    .then((thought) => {
      if (!thought) {
        return res.status(404).json({ message: 'No thought with this id!' })
      }
      res.json(thought);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
  },
  //remove a reaction from a thought
  removeReaction(req, res) {
    Thoughts.findOneAndUpdate(
      { _id: req.params.thoughtId },
      {$pull: {reactions: {reactionId: req.params.reactionId } } },
      { runValidatiors: true, new: true }
    )
      .then((thought) => {
        if (!thought) {
          return res.status(404).json({ message: 'No thought with this id!' })
        }
        res.json(thought);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });  
  },
};

module.exports = thoughtController