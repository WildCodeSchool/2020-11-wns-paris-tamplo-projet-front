import React, { useState, useEffect } from 'react'
import axios from 'axios'

import { NativeSelect, Button } from '@material-ui/core'
import MoodModal from './MoodModal'

import { StudentContainer, StudentForm } from '../styles/element'

import { IStudent } from '../types/data'

const Student = (): JSX.Element => {
  const [students, setStudents] = useState<IStudent[]>([])
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [selectStudent, setSelectStudent] = useState<IStudent>()

  const getStudents = async () => {
    const result = await axios.get('/students')
    setStudents(result.data)
  }

  useEffect(() => {
    getStudents()
  }, [])

  if (students === null) {
    return <p>Loading...</p>
  }

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const indexStudent = students.findIndex(
      (student) => student.id === parseInt(e.target.value, 10)
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
          {students.map((student) => (
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
