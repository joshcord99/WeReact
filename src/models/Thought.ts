import { Schema, Types, model, type Document } from "mongoose";
//reaction and thought in the same file

interface IReaction extends Document {
  reactionId: Schema.Types.ObjectId;
  reactionBody: string;
  username: string;
  createdAt: Date;
}

interface IThought extends Document {
  thoughtText: string;
  createdAt: Date;
  username: string;
  reactions: Schema.Types.ObjectId[];
}

const reactionSchema = new Schema<IReaction>(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 50,
      minlength: 4,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
    _id: false,
  }
);

const thoughtSchema = new Schema<IThought>(
  {
    thoughtText: {
      type: String,
      required: true,
      max_length: 50,
    },
    createdAt: {
      type: Date,
      required: true,
    },
    username: {
      type: String,
      required: true,
      max_length: 50,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
    },
    timestamps: true,
  }
);

const Thought = model("Thought", thoughtSchema);

export default Thought;
