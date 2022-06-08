import { createDoc } from '../helpers'

export const createUser = async ({ id, data }: { id: string; data: any }) => {
  await createDoc({ model: 'users', id, data })
}
