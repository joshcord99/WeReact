import { Schema, model, type Document } from "mongoose";
interface IUser extends Document {
  username: string;
  email: string;
  thoughts: Schema.Types.ObjectId[];
  freinds: Schema.Types.ObjectId[];
}

const UserSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    freinds: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    timestamps: true,
  }
);

const User = model<IUser>("User", UserSchema);

export default User;
