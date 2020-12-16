import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useHistory, RouteComponentProps } from 'react-router-dom'

import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from '@material-ui/core'
import averageValueOfArray from '../utils/average'
import { IMood, IStudent } from '../types/data'

interface IRouteInfo {
  mdp: string
}

const Teacher = ({ match }: RouteComponentProps<IRouteInfo>): JSX.Element => {
  const [moods, setMoods] = useState<IMood[]>([])
  const [students, setStudents] = useState<IStudent[]>([])
  const [dates, setDates] = useState<any[]>([])
  const history = useHistory()

  const getData = async () => {
    const { mdp } = match.params
    try {
      const resultMood = await axios('/moods', {
        params: { mdp }
      })
      setMoods(resultMood.data)
      setDates([...new Set(resultMood.data.map((el: IMood) => el.date))].sort())

      const resultStudents = await axios('/students')
      setStudents(resultStudents.data)
    } catch (error) {
      history.push('/teacher')
    }
  }

  useEffect(() => {
    getData()
    // eslint-disable-next-line
  }, [])

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
                    (
                      moods.find(
                        (mood) =>
                          mood.student_id === student.id && mood.date === date
                      ) || {}
                    ).note
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
