import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Teacher = () => {
  const [moods, setMoods] = useState(null)
  const [students, setStudents] = useState(null)
  const [dates, setDates] = useState(null)

  const getMoods = async () => {
    try {
      const result = await axios('http://localhost:8080/moods')
      setMoods(result.data)
      setDates([...new Set(result.data.map((el) => el.date))].sort())
    } catch (error) {
      console.log(error)
    }
  }

  const getStudents = async () => {
    try {
      const result = await axios('http://localhost:8080/students')
      setStudents(result.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => getMoods(), [])
  useEffect(() => getStudents(), [])

  if (moods === null || students === null || dates === null) {
    return <p>Loading...</p>
  }

  return (
    <div className="teacher-container">
      <h2>Mood tracker</h2>
      <table>
        <tr>
          <td>&nbsp;</td>
          {dates.map((date) => (
            <td key={date}>{date}</td>
          ))}
        </tr>
        {students.map((student) => (
          <tr>
            <td>{student.firstname}</td>
            {dates.map((date, i) => (
              <td key={i}>
                {
                  (moods.find(
                    (mood) =>
                      mood.student_id === student.id && mood.date === date
                  ) || {})['note']
                }
              </td>
            ))}
          </tr>
        ))}
      </table>
    </div>
  )
}

export default Teacher
