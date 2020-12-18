import React from 'react'

import { NativeSelect, Button } from '@material-ui/core'
import MoodModal from './MoodModal'

import { StudentContainer, StudentForm } from '../styles/element'

import { IStudent } from '../types/data'

interface IStudentProps {
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  students: { id: string; firstname: string; lastname: string }[]
  setOpenModal: (arg: boolean) => void
  openModal: boolean
  closeModal: () => void
  selectStudent: IStudent | undefined
}
const Student = ({
  handleChange,
  students,
  setOpenModal,
  openModal,
  closeModal,
  selectStudent
}: IStudentProps): JSX.Element => {
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
