import { model, Schema, Types } from 'mongoose'

// Create an interface representing a document in MongoDB.
export interface IFavorite {
    discountId: Types.ObjectId
    userId: Types.ObjectId
}

// Create a Schema corresponding to the document interfaces.
export const favoriteSchema = new Schema<IFavorite>(
    {
        discountId: Types.ObjectId,
        userId: Types.ObjectId
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

favoriteSchema.virtual('user', {
    ref: 'User',
    localField: 'userId',
    foreignField: 'id',
    justOne: true
})

favoriteSchema.virtual('discounts', {
    ref: 'Discount',
    localField: 'discountId',
    foreignField: 'id',
    justOne: true
})

export const Favorite = model<IFavorite>('Favorite', favoriteSchema)
