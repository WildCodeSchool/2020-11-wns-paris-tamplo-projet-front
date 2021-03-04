import React from 'react'
import { useQuery, gql, useMutation } from '@apollo/client'
import { Link } from 'react-router-dom'

// MUI Import
import {
  makeStyles,
  createStyles,
  Theme,
  withStyles
} from '@material-ui/core/styles'
import { Switch, IconButton, LinearProgress } from '@material-ui/core'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'
import AddCircleOutlinedIcon from '@material-ui/icons/AddCircleOutlined'

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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    quizItem: {
      width: '80%',
      margin: '20px auto',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    createQuizz: {
      display: 'flex',
      justifyContent: 'flex-end',
      marginBottom: '30px'
    },
    labelCreate: {
      marginRight: '5px'
    },
    quizTitle: {
      fontWeight: 'bold',
      width: '100px',
      marginRight: '5px'
    }
  })
)

const BorderLinearProgress = withStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '40%',
      height: 10,
      borderRadius: 5
    },
    colorPrimary: {
      backgroundColor: theme.palette.secondary.dark
    },
    bar: {
      borderRadius: 5,
      backgroundColor: theme.palette.primary.main
    }
  })
)(LinearProgress)

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
      <div className={classes.createQuizz}>
        <p className={classes.labelCreate}>Créer un quizz</p>
        <IconButton component={Link} to="/quiz/editor">
          <AddCircleOutlinedIcon color="primary" />
        </IconButton>
      </div>
      {quizzesDataWritable.quizzes &&
        quizzesDataWritable.quizzes.map((quiz: IQuiz) => (
          <div className={classes.quizItem}>
            <p className={classes.quizTitle} key={quiz.title}>
              {quiz.title}
            </p>
            <BorderLinearProgress variant="determinate" value={50} />
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
              <Switch color="primary" />
            </div>
          </div>
        ))}
    </div>
  )
}

export default TeacherQuiz
