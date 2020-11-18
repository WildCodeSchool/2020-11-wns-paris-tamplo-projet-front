import React, { useState, useEffect } from 'react'
import axios from 'axios'

import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from '@material-ui/core'
import { averageValueOfArray } from '../utils/average'

const Teacher = () => {
  const [moods, setMoods] = useState(null)
  const [students, setStudents] = useState(null)
  const [dates, setDates] = useState(null)

  const getMoods = async () => {
    try {
      const result = await axios('http://localhost:8080/moods')
      setMoods(result.data)
      setDates([...new Set(result.data.map((el) => el.date))].sort())
    } catch (error) {
      console.log(error)
    }
  }

  const getStudents = async () => {
    try {
      const result = await axios('http://localhost:8080/students')
      setStudents(result.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => getMoods(), [])
  useEffect(() => getStudents(), [])

  if (moods === null || students === null || dates === null) {
    return <p>Loading...</p>
  }

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
                <TableCell>
                  {
                    (moods.find(
                      (mood) =>
                        mood.student_id === student.id && mood.date === date
                    ) || {})['note']
                  }
                </TableCell>
              ))}
              <TableCell>
                {averageValueOfArray(moods, student.id, 'student_id', 'note')}
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell>Moy/jour</TableCell>
            {dates.map((date) => (
              <TableCell>
                {averageValueOfArray(moods, date, 'date', 'note')}
              </TableCell>
            ))}
            <TableCell>&nbsp;</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}

export default Teacher
