import React from 'react'

import { NativeSelect, Button } from '@material-ui/core'
import MoodModalContainer from './MoodModalContainer'

import { StudentContainer, StudentForm } from '../../styles/element'

import { IStudent } from '../../types/data'

interface IStudentProps {
  firstConnectionModal: any
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  students: { id: string; firstname: string; lastname: string }[]
  openModal: boolean
  closeModal: () => void
  selectStudent: IStudent | undefined
}

const Student = ({
  firstConnectionModal,
  handleChange,
  students,
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
          onClick={() => {
            firstConnectionModal()
          }}
        >
          Ok
        </Button>
      </StudentForm>
      {openModal && selectStudent && (
        <MoodModalContainer
          name={selectStudent.firstname}
          id={selectStudent.id}
          closemodal={closeModal}
        />
      )}
    </StudentContainer>
  )
}

export default Student
