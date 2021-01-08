import React, { useState } from 'react'
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

  const firstConnectionModal = () => {
    const dateConnection = Date.now()
    const today = new Date(dateConnection)
    console.log('date', today.toLocaleDateString(), typeof today)
    if (selectStudent) {
      const lastMoodOfStudent = selectStudent?.moods[0].created_at
      const lastMoodDateFormat = new Date(1608217961) // <= fonctionne, il faut que l'unix timestamp fasse 10 characteres.
      // C'est une string et pas un objet, c'est pour ça que tu galere
      console.log('mood student', lastMoodDateFormat, typeof lastMoodDateFormat)
    }
    // if (lastMoodOfStudent !== dateConnection) {
    //   setOpenModal(true)
    // }
    setOpenModal(false)
    return 0
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
