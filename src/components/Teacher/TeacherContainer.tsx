import React, { useState, useEffect } from 'react'
import { useQuery, gql } from '@apollo/client'

import Teacher from './Teacher'

import getUniqueDateFromStudents from '../../utils/getUniqueDateFromStudents'

const ALL_STUDENTS = gql`
  query users {
    users {
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
  const {
    loading: loadingStudents,
    error: errorStudents,
    data: dataStudents
  } = useQuery(ALL_STUDENTS)
  const [dates, setDates] = useState<string[]>([])

  useEffect(() => {
    if (dataStudents) {
      setDates(getUniqueDateFromStudents(dataStudents.users))
    }
    // eslint-disable-next-line
  }, [dataStudents])

  if (loadingStudents) {
    return <p>Loading...</p>
  }
  if (errorStudents) {
    return <p>Error...</p>
  }

  return (
    dataStudents.users && (
      <Teacher students={dataStudents.users} dates={dates} />
    )
  )
}

export default TeacherContainer
