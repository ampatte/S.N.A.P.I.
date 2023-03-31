const { Schema, model } =require('mongoose');

const thoughtSchema = new Schema(
    {
    thoughtText: {
        type: String,
        required: true,
        max_length: 280,
        },
    createdAt: {
        //* Date
        //* Set default value to the current timestamp
        //* Use a getter method to format the timestamp on query
        },
    username: {
        type: String,
        required: true,
        },
    }
)

// * `reactions` (These are like replies)
//   * Array of nested documents created with the `reactionSchema`

// **Schema Settings**:

// Create a virtual called `reactionCount` that retrieves the length of the thought's `reactions` array field on query.
const Thoughts = model('thoughts', thoughtSchema);

module.exports = Thoughts;