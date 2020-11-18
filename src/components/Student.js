import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Student = () => {
  const [students, setStudents] = useState(null)

  const getStudents = async () => {
    const result = await axios.get('http://localhost:8080/students')
    setStudents(result.data)
  }

  useEffect(() => {
    getStudents()
  }, [])

  if (students === null) {
    return <p>Loading...</p>
  }
  return (
    <div>
      <label htmlFor="student-select">Qui es tu ?</label>

      <select name="student" id="student-select">
        {students.map((student) => (
          <option value={student.firstname}>
            {student.firstname} {student.lastname}
          </option>
        ))}
      </select>
      <button>Ok</button>
    </div>
  )
}

export default Student
