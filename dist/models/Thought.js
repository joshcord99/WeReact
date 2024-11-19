import { Schema, Types, model } from "mongoose";
const reactionSchema = new Schema({
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
        default: Date.now
    },
}, {
    timestamps: true,
    _id: false,
});
const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        max_length: 50,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    username: {
        type: String,
        required: true,
        max_length: 50,
    },
    reactions: [reactionSchema],
}, {
    toJSON: {
        getters: true,
    },
    timestamps: true,
});
const Thought = model("Thought", thoughtSchema);
export default Thought;
