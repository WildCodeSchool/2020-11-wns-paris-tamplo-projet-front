import React from 'react'
import { useQuery, gql } from '@apollo/client'
import { Link } from 'react-router-dom'

import { IQuiz } from '../../types/quiz'

const ALL_QUIZZES = gql`
  query {
    quizzes {
      id
      title
      comment
      questions {
        id
        question
        responses {
          id
          response
          isCorrect
        }
      }
    }
  }
`

const StudentQuiz = (): JSX.Element => {
  const { data, error, loading } = useQuery(ALL_QUIZZES)

  if (loading) {
    return <p>Loading...</p>
  }
  if (error) {
    return <p>Error...</p>
  }

  return (
    <div className="teacherProfil-container">
      {data.quizzes.map((quiz: IQuiz) => (
        <Link
          to={{
            pathname: '/quiz/response',
            state: {
              quiz
            }
          }}
        >
          <p>{quiz.title}</p>
        </Link>
      ))}
    </div>
  )
}

export default StudentQuiz
