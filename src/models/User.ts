import { model, Schema, Types } from 'mongoose'
import { Favorite } from './Favorite'

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

userSchema.post('findOneAndDelete', async function (doc, next) {
    await Favorite.deleteMany({ userId: doc.id })
    next()
})

userSchema.virtual('discounts', {
    ref: 'Favorite',
    localField: 'id',
    foreignField: 'userId'
})

export const User = model<IUser>('User', userSchema)
