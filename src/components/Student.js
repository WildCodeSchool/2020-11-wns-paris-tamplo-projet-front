import React, { useState, useEffect } from 'react'
import axios from 'axios'

import MoodModal from './MoodModal'

import { NativeSelect, Button } from '@material-ui/core'

import { StudentContainer, StudentForm } from '../styles/element'

const Student = () => {
  const [students, setStudents] = useState(null)
  const [openModal, setOpenModal] = useState(false)
  const [selectStudent, setSelectStudent] = useState({})

  const getStudents = async () => {
    const result = await axios.get('/students')
    setStudents(result.data)
  }

  useEffect(() => {
    getStudents()
  }, [])
  if (students === null) {
    // TODO #15 Add animation log @SebG-prog
    return <p>Loading...</p>
  }

  const handleChange = (e) => {
    const indexStudent = students.findIndex(
      (student) => student.id === parseInt(e.target.value)
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
      {openModal && (
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
