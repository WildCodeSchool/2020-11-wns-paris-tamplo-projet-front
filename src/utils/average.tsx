// import { IMood } from '../types/data'

interface IMoodMock {
  id: number
  firstname: string
  lastname: string
  note: number
  date: string
  student_id: number
}

const getAverageOfList = (list: number[]) =>
  list.reduce((total, value) => total + value, 0) / list.length

const generateListOfRatingFromDate = (
  studentList: IMoodMock[],
  valueToFilter: string
) =>
  studentList.reduce(
    (list, student) =>
      student.date === valueToFilter ? [...list, student.note] : list,
    [] as number[]
  )

const getMoodAverageFromDate = (
  studentList: IMoodMock[],
  valueToFilter: string
): number => {
  const listOfRatings = generateListOfRatingFromDate(studentList, valueToFilter)
  if (!listOfRatings.length) return 0

  const averageRating = getAverageOfList(listOfRatings)

  return +averageRating.toFixed(1)
}

export default getMoodAverageFromDate
