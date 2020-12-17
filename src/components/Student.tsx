import React, { useState } from 'react'
import { useQuery, gql } from '@apollo/client'

import { NativeSelect, Button } from '@material-ui/core'
import MoodModal from './MoodModal'

import { StudentContainer, StudentForm } from '../styles/element'

import { IStudent } from '../types/data'

const ALL_STUDENTS = gql`
  query allStudents {
    allStudents {
      id
      firstname
      lastname
    }
  }
`

const Student = (): JSX.Element => {
  const {
    loading: loadingStudents,
    error: errorStudents,
    data: dataStudents
  } = useQuery(ALL_STUDENTS)
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [selectStudent, setSelectStudent] = useState<IStudent>()

  if (loadingStudents === null) {
    return <p>Loading...</p>
  }
  if (errorStudents === null) {
    return <p>Error...</p>
  }

  const students = dataStudents && dataStudents.allStudents

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const indexStudent = students.findIndex(
      (student: IStudent) => student.id === parseInt(e.target.value, 10)
    )
    setSelectStudent({ ...students[indexStudent] })
  }

  const closeModal = () => {
    setOpenModal(false)
  }

  return (
    <StudentContainer>
      <StudentForm>
        <NativeSelect
          name="student"
          id="student-select"
          onChange={handleChange}
        >
          <option value="">--Choisis un nom--</option>
          {students.map((student: IStudent) => (
            <option value={student.id} key={student.id}>
              {student.firstname} {student.lastname}
            </option>
          ))}
        </NativeSelect>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => setOpenModal(true)}
        >
          Ok
        </Button>
      </StudentForm>
      {openModal && selectStudent && (
        <MoodModal
          name={selectStudent.firstname}
          id={selectStudent.id}
          closemodal={closeModal}
        />
      )}
    </StudentContainer>
  )
}

export default Student
