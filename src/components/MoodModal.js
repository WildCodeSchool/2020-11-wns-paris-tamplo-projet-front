import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
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

import MoodOutlinedIcon from '@material-ui/icons/MoodOutlined'
import MoodBadOutlinedIcon from '@material-ui/icons/MoodBadOutlined'
import SentimentVeryDissatisfiedOutlinedIcon from '@material-ui/icons/SentimentVeryDissatisfiedOutlined'
import SentimentVerySatisfiedOutlinedIcon from '@material-ui/icons/SentimentVerySatisfiedOutlined'
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied'

const MoodModal = ({ id, name, closemodal }) => {
  const [note, setNote] = useState()

  return (
    <Modal>
      <Title>Bonjour {name},</Title>
      <SimpleText>Quel est ton état d'esprit aujourd'hui ?</SimpleText>
      <Form
        onSubmit={async (e) => {
          e.preventDefault()
          console.log(id, note)
          try {
            const result = await axios.post('http://localhost:8080/moods', {
              student_id: id,
              note: note
            })
            if (result.data.success) {
              console.log(result)
            }
            closemodal()
          } catch (error) {
            console.error(error)
          }
        }}
      >
        <Container>
          <Div>
            <Label>
              <SentimentVeryDissatisfiedOutlinedIcon fontSize="large" />
            </Label>
            <input
              type="radio"
              value="1"
              checked={note === 1}
              onChange={(e) => setNote(parseInt(e.target.value))}
            />
          </Div>
          <Div>
            <Label>
              <MoodBadOutlinedIcon fontSize="large" />
            </Label>
            <input
              type="radio"
              value="2"
              checked={note === 2}
              onChange={(e) => setNote(parseInt(e.target.value))}
            />
          </Div>
          <Div>
            <Label>
              <SentimentSatisfiedIcon fontSize="large" />
            </Label>
            <input
              type="radio"
              value="3"
              checked={note === 3}
              onChange={(e) => setNote(parseInt(e.target.value))}
            />
          </Div>
          <Div>
            <Label>
              <MoodOutlinedIcon fontSize="large" />
            </Label>
            <input
              type="radio"
              value="4"
              checked={note === 4}
              onChange={(e) => setNote(parseInt(e.target.value))}
            />
          </Div>
          <Div>
            <Label>
              <SentimentVerySatisfiedOutlinedIcon fontSize="large" />
            </Label>
            <input
              type="radio"
              value="5"
              checked={note === 5}
              onChange={(e) => setNote(parseInt(e.target.value))}
            />
          </Div>
        </Container>
        {note && <SimpleText>Tu as selectionné l'humeur {note} !</SimpleText>}
        <Button type="submit">
          Ajouter mon humeur <i className="far fa-paper-plane"></i>
        </Button>
      </Form>
    </Modal>
  )
}

export default MoodModal
