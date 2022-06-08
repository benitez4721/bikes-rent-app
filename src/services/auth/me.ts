import { getOne } from '../helpers'

export const me = async (id: string) => {
  try {
    const response = await getOne({ id, model: 'users' })
    return response
  } catch (error) {
    console.log(error)
  }
}
