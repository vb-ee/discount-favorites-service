import { consumeMessage } from '@payhasly-discount/common'
import { User } from '../models/User'

export const createUser = consumeMessage(
    'AMQP_URL',
    'createUserFavorite',
    async (msg) => {
        User.init()
        await User.create({ id: msg })
        console.log('User created')
    }
)

export const deleteUser = consumeMessage(
    'AMQP_URL',
    'deleteUserFavorite',
    async (msg) => {
        await User.findOneAndDelete({ id: msg })
        console.log('user deleted')
    }
)
