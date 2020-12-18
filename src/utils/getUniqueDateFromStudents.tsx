import { IStudent } from '../types/data'

const getUniqueDateFromStudents = (studentList: IStudent[]): string[] => {
  const listOfDates = studentList.reduce(
    (list, student) => [
      ...list,
      ...student.moods.map((mood) => mood.created_at)
    ],
    [] as string[]
  )
  return [...new Set(listOfDates)].sort()
}

export default getUniqueDateFromStudents
