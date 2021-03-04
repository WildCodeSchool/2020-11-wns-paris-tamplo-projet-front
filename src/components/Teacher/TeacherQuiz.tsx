import React from 'react'
import { useQuery, gql, useMutation } from '@apollo/client'
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
const DELETE_QUIZ = gql`
  mutation deleteQuiz($id: String) {
    deleteQuiz(id: $id)
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

  const [deleteQuiz] = useMutation(DELETE_QUIZ, { refetchQueries: ['quizzes'] })

  const removeQuiz = async (idQuiz: string) => {
    try {
      await deleteQuiz({
        variables: {
          id: idQuiz
        }
      })
    } catch (e) {
      console.error(e)
    }
  }

  if (loadingQuizzes) {
    return <p>Loading...</p>
  }
  if (errorQuizzes) {
    return <p>Error...</p>
  }
  const quizzesDataWritable = JSON.parse(JSON.stringify(dataQuizzes))

  return (
    <div className="teacherHome-container">
      <p>Je suis la page quiz du Teacher</p>
      <Button component={Link} to="/quiz/editor">
        Créer un quiz
      </Button>
      {quizzesDataWritable.quizzes &&
        quizzesDataWritable.quizzes.map((quiz: IQuiz) => (
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
              <IconButton onClick={() => removeQuiz(quiz.id)}>
                <DeleteOutlineIcon />
              </IconButton>
            </div>
          </div>
        ))}
    </div>
  )
}

export default TeacherQuiz
