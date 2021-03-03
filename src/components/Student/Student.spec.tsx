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
  openModal: false,
  closeModal: jest.fn(),
  selectStudent: undefined,
  firstConnectionModal: jest.fn()
}

describe('Student', () => {
  it('renders a button with Ok', () => {
    render(
      <Student
        handleChange={defaultProps.handleChange}
        students={defaultProps.students}
        firstConnectionModal={defaultProps.firstConnectionModal}
        openModal={defaultProps.openModal}
        closeModal={defaultProps.closeModal}
        selectStudent={defaultProps.selectStudent}
      />
    )

    expect(screen.getByRole('button')).toHaveTextContent('Ok')
  })
})
