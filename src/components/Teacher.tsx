import React from 'react'

import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from '@material-ui/core'

import { IMood, IStudent } from '../types/data'

interface ITeacherProps {
  students: IStudent[]
  dates: string[]
}

const getNote = (student: IStudent, date: string): number => {
  const indexMood = student.moods.findIndex(
    (mood) => mood.created_at === date[0]
  )
  console.log(indexMood)
  return student.moods[indexMood]?.note
}

const Teacher = ({ students, dates }: ITeacherProps): JSX.Element => {
  console.log(students)
  return (
    <div className="teacher-container">
      <h2>Suivi d'humeur</h2>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>&nbsp;</TableCell>
            {dates.map((date) => (
              <TableCell>{date}</TableCell>
            ))}
            <TableCell>Moy/élève</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {students.map((student) => (
            <TableRow>
              <TableCell>{student.firstname}</TableCell>
              {dates.map((date) => (
                <TableCell>{getNote(student, date)}</TableCell>
              ))}
              {/* <TableCell>
                {averageValueOfArray(moods, student.id, 'student_id', 'note')}
              </TableCell> */}
            </TableRow>
          ))}
          {/* <TableRow>
            <TableCell>Moy/jour</TableCell>
            {dates.map((date) => (
              <TableCell>
                {averageValueOfArray(moods, date, 'date', 'note')}
              </TableCell>
            ))}
            <TableCell>&nbsp;</TableCell>
          </TableRow> */}
        </TableBody>
      </Table>
    </div>
  )
}

export default Teacher
