import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  query,
  QueryConstraint,
  setDoc,
} from '@firebase/firestore'
import { db } from '../libs/firebase/config'

export const getOne = async ({ id, model }: { id: string; model: string }) => {
  const docRef = doc(db, model, id)
  const response = (await getDoc(docRef)).data()
  return response
}

export const getAll = <T>({
  model,
  setData,
  query: queryConstraint = null,
}: {
  model: string
  setData: (data: T[]) => void
  query?: QueryConstraint | null
}) => {
  const collectionRef = collection(db, model)
  const snapshotQuery = queryConstraint ? query(collectionRef, queryConstraint) : collectionRef
  const unsubscribe = onSnapshot(snapshotQuery, (snapshot) => {
    setData(
      snapshot.docs.map((doc) => {
        const data = doc.data()
        data.id = doc.id
        return data as T
      }),
    )
  })

  return unsubscribe
}

export const createDoc = async <T>({
  model,
  id,
  data,
}: {
  model: string
  id?: string
  data: T
}) => {
  try {
    if (id) {
      await setDoc(doc(db, model, id), data)
    } else {
      await addDoc(collection(db, model), data)
    }
  } catch (error) {
    console.log(error)
  }
}

export const removeDoc = async ({ model, id }: { model: string; id: string }) => {
  try {
    await deleteDoc(doc(db, model, id))
  } catch (error) {
    console.log(error)
  }
}

export const updateDoc = async ({
  model,
  data: { id, ...dataToUpdate },
}: {
  model: string
  data: any
}) => {
  try {
    await setDoc(doc(db, model, id), dataToUpdate)
  } catch (error) {
    console.log(error)
  }
}
