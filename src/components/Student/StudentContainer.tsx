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
        handleChange={handleChange}
        students={dataStudents.students}
        setOpenModal={setOpenModal}
        openModal={openModal}
        closeModal={closeModal}
        selectStudent={selectStudent}
      />
    )
  )
}

export default StudentContainer
