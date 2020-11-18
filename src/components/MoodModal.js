import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import {
  Title,
  Modal,
  SimpleText,
  Label,
  Container,
  Form,
  Button,
  Div
} from '../styles/modal-element'

import SentimentVeryDissatisfiedOutlinedIcon from '@material-ui/icons/SentimentVeryDissatisfiedOutlined'

const MoodModal = () => {
  const [mood, setMood] = useState()
  const [redirect, setRedirect] = useState(null)

  const handleSubmit = (e) => {
    try {
      e.preventDefault()
      console.log(mood)
      setRedirect('/')
    } catch (err) {
      console.error(err)
    }
  }

  if (redirect) {
    return <Redirect to={redirect} />
  }

  return (
    <Modal>
      <Title>Bonjour Arthur,</Title>
      <SimpleText>Quel est ton état d'esprit aujourd'hui ?</SimpleText>
      <Form onSubmit={handleSubmit}>
        <Container>
          <Div>
            <Label>
              <SentimentVeryDissatisfiedOutlinedIcon />
            </Label>
            <input
              type="radio"
              value="1"
              checked={mood === 1}
              onChange={(e) => setMood(parseInt(e.target.value))}
            />
          </Div>
          <Div>
            <Label></Label>
            <input
              type="radio"
              value="2"
              checked={mood === 2}
              onChange={(e) => setMood(parseInt(e.target.value))}
            />
          </Div>
          <Div>
            <Label></Label>
            <input
              type="radio"
              value="3"
              checked={mood === 3}
              onChange={(e) => setMood(parseInt(e.target.value))}
            />
          </Div>
          <Div>
            <Label></Label>
            <input
              type="radio"
              value="4"
              checked={mood === 4}
              onChange={(e) => setMood(parseInt(e.target.value))}
            />
          </Div>
          <Div>
            <Label></Label>
            <input
              type="radio"
              value="5"
              checked={mood === 5}
              onChange={(e) => setMood(parseInt(e.target.value))}
            />
          </Div>
        </Container>
        {mood && <SimpleText>Tu as selectionné l'humeur {mood} !</SimpleText>}
        <Button type="submit">
          Ajouter mon humeur <i className="far fa-paper-plane"></i>
        </Button>
      </Form>
    </Modal>
  )
}

export default MoodModal
