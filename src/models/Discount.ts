import { model, Schema, Types } from 'mongoose'
import { Favorite } from './Favorite'

// Create an interface representing a document in MongoDB.
export interface IDiscount {
    id: Types.ObjectId
    title: string
    description: string
    imageUrl: string
    discount: number
    expiryAt: Date
}

// Create a Schema corresponding to the document interfaces.
export const discountSchema = new Schema<IDiscount>(
    {
        id: Types.ObjectId,
        title: String,
        description: String,
        imageUrl: String,
        discount: Number,
        expiryAt: Date
    },
    {
        toJSON: {
            transform(doc, ret) {
                delete ret._id
            },
            virtuals: true
        },
        toObject: { virtuals: true },
        versionKey: false
    }
)

discountSchema.post('findOneAndDelete', async function (doc, next) {
    await Favorite.deleteMany({ discountId: doc.id })
    next()
})

export const Discount = model<IDiscount>('Discount', discountSchema)
