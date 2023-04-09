const { Schema, model } = require('mongoose');
const thoughtSchema = require('./Thoughts');
const reactionSchema = require('./Reactions');

const userSchema = new Schema(
  {
    username: {
        type: String,
        required: true,
        unique: true,
        trimmed: true,        
    },
    email: { 
        type: String,
        required: true,
        unique: true,
        //* Must match a valid email address (look into Mongoose's matching validation)
        match:/^\S+@\S+\.\S+$/,
    },
    reactions: [reactionSchema],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Users'
        }
    ]
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
    id: false,
  }
)
// **Schema Settings**:

// Create a virtual called `friendCount` that retrieves the length of the user's `friends` array field on query.
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
  });

const Users = model('Users', userSchema);

module.exports = Users;