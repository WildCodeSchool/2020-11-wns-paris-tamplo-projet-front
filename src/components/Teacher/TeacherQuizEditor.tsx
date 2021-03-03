import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useMutation, gql } from '@apollo/client'

// MUI Import
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import {
  Paper,
  Input,
  FilledInput,
  Checkbox,
  Button,
  IconButton
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import CloseIcon from '@material-ui/icons/Close'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'

// Type
import { IQuestion, IResponse } from '../../types/quiz'

const ADD_QUIZ = gql`
  mutation createQuiz($quiz: inputQuiz) {
    createQuiz(quiz: $quiz) {
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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    quiz: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    paper: {
      width: '90%',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      marginBottom: '30px'
    },
    title: {
      fontSize: '30px',
      'margin-bottom': '15px'
    },
    question: {
      fontSize: '20px',
      'margin-bottom': '15px'
    },
    answer: {
      display: 'flex',
      justifyContent: 'space-between'
    },
    option: {
      width: '80%'
    },
    addOption: {
      width: 'auto',
      margin: '20px auto'
    },
    submit: {
      margin: '50px'
    },
    deleteQuestion: {
      alignSelf: 'flex-end'
    }
  })
)

const TeacherQuizEditor = (): JSX.Element => {
  const classes = useStyles()
  const history = useHistory()
  const [addQuiz] = useMutation(ADD_QUIZ)
  const [title, setTitle] = useState()
  const [comment, setComment] = useState()
  const [questions, setQuestions] = useState<IQuestion[]>([])

  const postQuiz = async () => {
    try {
      await addQuiz({
        variables: {
          quiz: {
            title,
            comment,
            questions
          }
        }
      })
    } catch (e) {
      console.error(e)
    }
  }

  const addTitle = (e: any) => {
    setTitle(e.target.value)
  }

  const addComment = (e: any) => {
    setComment(e.target.value)
  }

  const addQuestion = () => {
    const questionsTemp = [...questions]
    const newQuestion = {
      question: '',
      responses: [
        {
          response: '',
          isCorrect: false
        }
      ]
    }
    questionsTemp.push(newQuestion)
    setQuestions(questionsTemp)
  }

  const removeQuestion = (i: number) => {
    const questionsTemp = [...questions]
    questionsTemp.splice(i, 1)
    setQuestions(questionsTemp)
  }

  const addResponse = (i: number) => {
    const questionsTemp = [...questions]
    const newResponse = {
      response: '',
      isCorrect: false
    }
    questionsTemp[i].responses.push(newResponse)
    setQuestions(questionsTemp)
  }

  const removeResponse = (i: number, j: number) => {
    const questionsTemp = [...questions]
    questionsTemp[i].responses.splice(j, 1)
    setQuestions(questionsTemp)
  }

  const handleChangeQuestion = (text: string, i: number) => {
    const questionsTemp = [...questions]
    questionsTemp[i].question = text
    setQuestions(questionsTemp)
  }

  const handleChangeResponse = (text: string, i: number, j: number) => {
    const questionsTemp = [...questions]
    questionsTemp[i].responses[j].response = text
    setQuestions(questionsTemp)
  }

  const handleChangeCheck = (isChecked: boolean, i: number, j: number) => {
    const questionsTemp = [...questions]
    questionsTemp[i].responses[j].isCorrect = isChecked
    setQuestions(questionsTemp)
  }

  return (
    <div className={classes.quiz}>
      <Paper elevation={2} className={classes.paper}>
        <Input
          id="title"
          value={title}
          placeholder="Titre du quiz"
          color="primary"
          fullWidth
          className={classes.title}
          onChange={addTitle}
        />
        <Input
          id="description"
          value={comment}
          placeholder="Description du quiz"
          multiline
          fullWidth
          onChange={addComment}
        />
      </Paper>
      {questions.length > 0 &&
        questions.map((question: IQuestion, indexQ: number) => (
          <Paper elevation={2} className={classes.paper}>
            <FilledInput
              value={question.question}
              placeholder="Question"
              color="primary"
              fullWidth
              className={classes.question}
              onChange={(e) => handleChangeQuestion(e.target.value, indexQ)}
            />
            {question.responses.map((response: IResponse, indexR: number) => (
              <div className={classes.answer}>
                <Input
                  value={response.response}
                  placeholder="option"
                  color="primary"
                  className={classes.option}
                  onChange={(e) =>
                    handleChangeResponse(e.target.value, indexQ, indexR)
                  }
                />
                <Checkbox
                  checked={response.isCorrect}
                  color="primary"
                  onChange={(e) =>
                    handleChangeCheck(e.target.checked, indexQ, indexR)
                  }
                />
                <IconButton onClick={() => removeResponse(indexQ, indexR)}>
                  <CloseIcon />
                </IconButton>
              </div>
            ))}
            <Button
              onClick={() => addResponse(indexQ)}
              className={classes.addOption}
              variant="outlined"
              startIcon={<AddIcon />}
            >
              Ajouter une option
            </Button>
            <IconButton
              className={classes.deleteQuestion}
              onClick={() => removeQuestion(indexQ)}
            >
              <DeleteOutlineIcon />
            </IconButton>
          </Paper>
        ))}
      <Button
        onClick={addQuestion}
        color="primary"
        variant="outlined"
        startIcon={<AddIcon />}
      >
        Ajouter une question
      </Button>
      <Button
        className={classes.submit}
        color="primary"
        variant="contained"
        onClick={async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
          e.preventDefault()
          try {
            postQuiz()
            history.goBack()
          } catch (error) {
            console.error(error)
          }
        }}
      >
        Enregistrer le quiz
      </Button>
    </div>
  )
}

export default TeacherQuizEditor
