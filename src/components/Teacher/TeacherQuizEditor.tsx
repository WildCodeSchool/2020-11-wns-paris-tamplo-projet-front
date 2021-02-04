import React, { useState } from 'react'

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { Paper, Input, FilledInput, Checkbox, Button } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'

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
    }
  })
)

const TeacherQuizEditor = (): JSX.Element => {
  const classes = useStyles()
  const [title, setTitle] = useState()
  const [comments, setComments] = useState()
  const [questions, setQuestions] = useState<any[]>([])

  const addTitle = (e: any) => {
    setTitle(e.target.value)
  }

  const addComments = (e: any) => {
    setComments(e.target.value)
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

  const addResponse = (i: any) => {
    const questionsTemp = [...questions]
    const newResponse = {
      response: '',
      isCorrect: false
    }
    questionsTemp[i].responses.push(newResponse)
    setQuestions(questionsTemp)
  }

  const handleChangeQuestion = (text: any, i: any) => {
    const questionsTemp = [...questions]
    questionsTemp[i].question = text
    setQuestions(questionsTemp)
  }

  const handleChangeResponse = (text: any, i: any, j: any) => {
    const questionsTemp = [...questions]
    questionsTemp[i].responses[j].response = text
    setQuestions(questionsTemp)
  }

  const handleChangeCheck = (isChecked: any, i: any, j: any) => {
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
          value={comments}
          placeholder="Description du quiz"
          multiline
          fullWidth
          onChange={addComments}
        />
      </Paper>
      {questions.length > 0 &&
        questions.map((question, indexQ) => (
          <Paper elevation={2} className={classes.paper}>
            <FilledInput
              value={question.question}
              placeholder="Question"
              color="primary"
              fullWidth
              className={classes.question}
              onChange={(e) => handleChangeQuestion(e.target.value, indexQ)}
            />
            {question.responses.map((response: any, indexR: any) => (
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
      <Button className={classes.submit} color="primary" variant="contained">
        Enregistrer le quiz
      </Button>
    </div>
  )
}

export default TeacherQuizEditor
