import React from 'react'
import { useQuery, gql } from '@apollo/client'
import { Link } from 'react-router-dom'

// MUI Import
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { Button, IconButton } from '@material-ui/core'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'

// Type
import { IQuiz } from '../../types/quiz'

const ALL_QUIZZES = gql`
  query quizzes {
    quizzes {
      id
      title
      comment
      questions {
        question
        responses {
          response
          isCorrect
        }
      }
    }
  }
`

const useStyles = makeStyles(() =>
  createStyles({
    quizItem: {
      width: '80%',
      margin: 'auto',
      display: 'flex',
      justifyContent: 'space-between'
    }
  })
)

const TeacherQuiz = (): JSX.Element => {
  const classes = useStyles()
  const {
    loading: loadingQuizzes,
    error: errorQuizzes,
    data: dataQuizzes
  } = useQuery(ALL_QUIZZES)

  if (loadingQuizzes) {
    return <p>Loading...</p>
  }
  if (errorQuizzes) {
    return <p>Error...</p>
  }
  // const quizzesDataWritable = JSON.parse(JSON.stringify(dataQuizzes))

  return (
    <div className="teacherHome-container">
      <p>Je suis la page quiz du Teacher</p>
      <Button component={Link} to="/quiz/create">
        Créer un quiz
      </Button>
      {dataQuizzes.quizzes &&
        dataQuizzes.quizzes.map((quiz: IQuiz) => (
          <div className={classes.quizItem}>
            <p key={quiz.title}>{quiz.title}</p>
            <div>
              <Link
                to={{
                  pathname: '/quiz/editor',
                  state: {
                    quiz
                  }
                }}
              >
                <IconButton>
                  <EditOutlinedIcon />
                </IconButton>
              </Link>
              <IconButton>
                <DeleteOutlineIcon />
              </IconButton>
            </div>
          </div>
        ))}
    </div>
  )
}

export default TeacherQuiz
