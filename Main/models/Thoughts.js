const { Schema, model } = require('mongoose');

const thoughtSchema = new Schema(
    {
    thoughtText: {
        type: String,
        required: true,
        max_length: 280,
        },
    createdAt: {
        type: Date,
        //* Set default value to the current timestamp
        default:Date.now,
        //* Use a getter method to format the timestamp on query
        get: (date) => timeSince(date),
        },
    username: {
        type: String,
        required: true,
        },
    },
    {
        toJSON: {
          getters: true,
          virtuals: true,
        },
        id: false,
      }
)

// * `reactions` (These are like replies)
//   * Array of nested documents created with the `reactionSchema`

// **Schema Settings**:

// Create a virtual called `reactionCount` that retrieves the length of the thought's `reactions` array field on query.
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
  });

const Thoughts = model('thoughts', thoughtSchema);

module.exports = Thoughts;