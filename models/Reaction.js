const { Schema, Types } = require('mongoose');


const reactionSchema = new Schema(
    {
      reactionId: {
        type: Schema.Types.ObjectId,  
        default: new mongoose.Types.ObjectId()                                
      },
      reactionBody: {
        type: String,
        required: true,
        max: 280
      },
      username: {
        type: String,
        required: true
      },  
      createdAt: {
        type: Date,
        default: Date.now,
        get: function () {
          return this.createdAt.toISOString();
        }     
      },
    });
module.exports = reactionSchema;