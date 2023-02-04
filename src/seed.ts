import { accessEnv } from '@payhasly-discount/common'
import mongoose from 'mongoose'
import { Discount } from './models/Discount'

mongoose
    .connect(accessEnv('DISCOUNTS_DB_URI'))
    .then(async () => {
        let jsonData: any[] = []
        const collection = mongoose.connection.collection('discounts')
        const documents = await collection.find({}).toArray()
        for (const disc of documents) {
            const { _id, title, description, expiryAt, imageUrl, discount } =
                disc
            jsonData.push({
                id: _id,
                title,
                description,
                expiryAt,
                imageUrl,
                discount
            })
        }
        mongoose.connection.close()
        mongoose.connect(accessEnv('MONGO_DB_URI')).then(() => {
            Discount.deleteMany({}, (err) => {
                if (err) {
                    console.error('Error clearing collection:', err)
                } else {
                    console.log('Collection cleared successfully')

                    Discount.insertMany(jsonData, (err, docs) => {
                        if (err) {
                            console.error('Error inserting data:', err)
                        } else {
                            console.log('Data inserted successfully:', docs)
                        }

                        mongoose.connection.close()
                    })
                }
            })
        })
    })
    .catch((error) => console.error('Error:', error))
