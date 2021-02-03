import React from 'react'
import { render, screen } from '@testing-library/react'
import Student from './Student'

const defaultProps = {
  handleChange: jest.fn(),
  students: [
    {
      id: '64681435483',
      firstname: 'John',
      lastname: 'Doe'
    }
  ],
  setOpenModal: jest.fn(),
  openModal: false,
  closeModal: jest.fn(),
  selectStudent: undefined
}

describe('Student', () => {
  it('renders a button with Ok', () => {
    render(
      <Student
        handleChange={defaultProps.handleChange}
        students={defaultProps.students}
        setOpenModal={defaultProps.setOpenModal}
        openModal={defaultProps.openModal}
        closeModal={defaultProps.closeModal}
        selectStudent={defaultProps.selectStudent}
      />
    )

    expect(screen.getByRole('button')).toHaveTextContent('Ok')
  })
})
