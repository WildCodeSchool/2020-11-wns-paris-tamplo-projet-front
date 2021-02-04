import React from 'react'
import { Link } from 'react-router-dom'

import { Button } from '@material-ui/core'

const TeacherQuiz = (): JSX.Element => {
  return (
    <div className="teacherHome-container">
      <p>Je suis la page quiz du Teacher</p>
      <Button component={Link} to="/quiz/editor">
        Créer un quiz
      </Button>
    </div>
  )
}

export default TeacherQuiz
