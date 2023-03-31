const { Schema, model } = require('mongoose');
const thoughtSchema = require('./Thoughts');

const userSchema = new Schema(
    {
    username: {
        type: String,
        required: true,
        unique: true,
        //* Trimmed  
    },
    email: { 
        type: String,
        required: true,
        unique: true,
        //* Must match a valid email address (look into Mongoose's matching validation)
    },
    thoughts: [thoughtSchema], //   * Array of `_id` values referencing the `Thought` model
    friends: [friendsSchema] //* Array of `_id` values referencing the `User` model (self-reference)
    }
)
// **Schema Settings**:

// Create a virtual called `friendCount` that retrieves the length of the user's `friends` array field on query.
const Users = model('users', userSchema);

module.exports = Student;