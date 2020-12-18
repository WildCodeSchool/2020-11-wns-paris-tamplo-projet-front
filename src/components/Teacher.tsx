import React from 'react'

import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from '@material-ui/core'

import { IStudent } from '../types/data'
import getStudentAverageMood from '../utils/getStudentAverageMood'
import getDateAverageMood from '../utils/getDateAverageMood'

interface ITeacherProps {
  students: IStudent[]
  dates: string[]
}

const getNote = (student: IStudent, date: string): number => {
  const indexMood = student.moods.findIndex((mood) => mood.created_at === date)
  return student.moods[indexMood]?.note
}

const Teacher = ({ students, dates }: ITeacherProps): JSX.Element => {
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
              <TableCell>{getStudentAverageMood(student)}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell>Moy/jour</TableCell>
            {dates.map((date) => (
              <TableCell>{getDateAverageMood(students, date)}</TableCell>
            ))}
            <TableCell>&nbsp;</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}

export default Teacher
