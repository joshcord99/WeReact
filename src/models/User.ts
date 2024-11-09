import { Schema, model, type Document } from 'mongoose';

interface IUser extends Document {
    username: string,
    email: string,
    thoughts:Schema.Types.ObjectId[],
    freinds: Schema.Types.ObjectId[]
}

const courseSchema = new Schema<IUser>(
    {
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            default: true,
        },
        thoughts: {
            type: Schema.Types.ObjectId[],
            default: Date.now(),
        },
         freinds: {
            type: Schema.Types.ObjectId[],
            // Sets a default value of 12 weeks from now
            default: 
        },
    },
    {
        toJSON: {
            virtuals: true,
        },
        timestamps: true
    },
);

const Course = model<IUser>('Course', courseSchema);

export default Course;
