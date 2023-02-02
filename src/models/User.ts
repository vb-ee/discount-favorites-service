import { model, Schema, Types } from 'mongoose'

// Create an interface representing a document in MongoDB.
export interface IUser {
    id: Types.ObjectId
}

// Create a Schema corresponding to the document interfaces.
export const userSchema = new Schema<IUser>(
    {
        id: Types.ObjectId
    },
    {
        toJSON: {
            transform(doc, ret) {
                delete ret._id
            }
        },
        versionKey: false
    }
)

export const User = model<IUser>('User', userSchema)
