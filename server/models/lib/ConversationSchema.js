const { Schema, model } = require('mongoose');

const Conversations = Schema(
  {
    aUserId: [String],
    aUsers: [
      {
        iUserId: Schema.Types.ObjectId,
        sUserName: String,
      },
    ],
    bFreezed: { type: Boolean, default: false },
  },
  { timestamps: { createdAt: 'dCreatedDate', updatedAt: 'dUpdatedDate' } }
);

module.exports = model('conversations', Conversations);
