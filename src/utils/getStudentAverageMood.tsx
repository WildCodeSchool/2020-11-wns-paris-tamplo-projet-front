import { IStudent } from '../types/data'

const getAverageOfList = (list: number[]) =>
  list.reduce((total, value) => total + value, 0) / list.length

const getStudentAverageMood = (student: IStudent): number => {
  const listOfRates = student.moods.reduce(
    (list, mood) => [...list, mood.note],
    [] as number[]
  )

  const averageRating = getAverageOfList(listOfRates)

  return +averageRating.toFixed(1)
}

export default getStudentAverageMood
