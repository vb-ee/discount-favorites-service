import { consumeMessage } from '@payhasly-discount/common'
import { IDiscount, Discount } from '../models/Discount'

export const createDiscount = consumeMessage(
    'AMQP_URL',
    'createDiscount',
    async (msg) => {
        await Discount.create(<IDiscount>JSON.parse(msg))
        console.log('Discount created')
    }
)

export const updateDiscount = consumeMessage(
    'AMQP_URL',
    'updateDiscount',
    async (msg) => {
        const { id } = <IDiscount>JSON.parse(msg)
        await Discount.findOneAndUpdate({ id }, JSON.parse(msg))
        console.log('Discount updated')
    }
)

export const deleteDiscount = consumeMessage(
    'AMQP_URL',
    'deleteDiscount',
    async (msg) => {
        await Discount.findOneAndDelete({ id: msg })
        console.log('Discount deleted')
    }
)
