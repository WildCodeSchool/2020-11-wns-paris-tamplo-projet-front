import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'

import Student from './Student'

import { IStudent } from '../../types/data'

const ALL_STUDENTS = gql`
  query students {
    students {
      id
      firstname
      lastname
      moods {
        created_at
      }
    }
  }
`

const StudentContainer = (): JSX.Element => {
  const {
    loading: loadingStudents,
    error: errorStudents,
    data: dataStudents
  } = useQuery(ALL_STUDENTS)

  const [openModal, setOpenModal] = useState<boolean>(false)
  const [selectStudent, setSelectStudent] = useState<IStudent>()
  const history = useHistory()

  const firstConnectionModal = (): any => {
    const dateConnection = Date.now()
    const today = new Date(dateConnection)

    if (selectStudent) {
      const lastMoodOfStudent = new Date(
        selectStudent?.moods[selectStudent?.moods.length - 1]?.created_at
      )

      const isAlreadyFilled =
        lastMoodOfStudent.toLocaleDateString() !== today.toLocaleDateString()
          ? setOpenModal(true)
          : history.push('/profil')
      return isAlreadyFilled
    }
    return null
  }

  if (loadingStudents) {
    return <p>Loading...</p>
  }
  if (errorStudents) {
    return <p>Error...</p>
  }

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const indexStudent = dataStudents.students.findIndex(
      (student: IStudent) => student.id === e.target.value
    )
    setSelectStudent({ ...dataStudents.students[indexStudent] })
  }

  const closeModal = () => {
    setOpenModal(false)
  }

  return (
    dataStudents.students && (
      <Student
        firstConnectionModal={firstConnectionModal}
        handleChange={handleChange}
        students={dataStudents.students}
        openModal={openModal}
        closeModal={closeModal}
        selectStudent={selectStudent}
      />
    )
  )
}

export default StudentContainer
