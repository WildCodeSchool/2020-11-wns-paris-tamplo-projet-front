import { IStudent } from '../types/data'

const getAverageOfList = (list: number[]) =>
  list.reduce((total, value) => total + value, 0) / list.length

const getDateAverageMood = (students: IStudent[], date: string): number => {
  const listOfRates = students.reduce((list, student) => {
    const studentMood = student.moods.reduce(
      (value, mood) =>
        mood.created_at === date ? [...value, mood.note] : value,
      [] as number[]
    )
    return [...list, ...studentMood]
  }, [] as number[])

  const averageRating = getAverageOfList(listOfRates)

  return +averageRating.toFixed(1)
}

export default getDateAverageMood
