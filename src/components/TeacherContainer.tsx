import React, { useState, useEffect } from 'react'
import { useQuery, gql } from '@apollo/client'
import { useHistory, RouteComponentProps } from 'react-router-dom'

import Teacher from './Teacher'

import { IMood, IStudent } from '../types/data'
import averageValueOfArray from '../utils/average'

const ALL_STUDENTS = gql`
  query students {
    students {
      id
      firstname
      lastname
      moods {
        note
        comment
        created_at
      }
    }
  }
`

const TeacherContainer = (): JSX.Element => {
  // const [moods, setMoods] = useState<IMood[]>([])
  const {
    loading: loadingStudents,
    error: errorStudents,
    data: dataStudents
  } = useQuery(ALL_STUDENTS)
  const [dates, setDates] = useState<any[]>([])
  // const history = useHistory()

  // const getData = async () => {
  //   // const { mdp } = match.params
  //   try {
  //     // const resultMood = await axios('/moods', {
  //     //   params: { mdp }
  //     // })
  //     setMoods(resultMood.data)

  //     const resultStudents = await axios('/students')
  //     setStudents(resultStudents.data)
  //   } catch (error) {
  //     history.push('/teacher')
  //   }
  // }

  useEffect(() => {
    if (dataStudents) {
      setDates(
        [
          ...new Set(
            dataStudents.students.map((student: IStudent) =>
              student.moods.map((mood: IMood) => mood.created_at)
            )
          )
        ].sort()
      )
    }
    // eslint-disable-next-line
  }, [dataStudents])

  // if (moods === null || students === null || dates === null) {
  //   return <p>Loading...</p>
  // }

  if (loadingStudents) {
    return <p>Loading...</p>
  }
  if (errorStudents) {
    return <p>Error...</p>
  }

  return (
    dataStudents.students && (
      <Teacher students={dataStudents.students} dates={dates} />
    )
  )
}

export default TeacherContainer
