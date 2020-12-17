import React, { useState } from 'react'
import axios from 'axios'
import { useMutation, gql } from '@apollo/client'

import MoodOutlinedIcon from '@material-ui/icons/MoodOutlined'
import MoodBadOutlinedIcon from '@material-ui/icons/MoodBadOutlined'
import SentimentVeryDissatisfiedOutlinedIcon from '@material-ui/icons/SentimentVeryDissatisfiedOutlined'
import SentimentVerySatisfiedOutlinedIcon from '@material-ui/icons/SentimentVerySatisfiedOutlined'
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied'
import {
  Title,
  Modal,
  SimpleText,
  Label,
  Container,
  Form,
  Button,
  Div,
  Input
} from '../styles/modal-element'

interface IProps {
  id: string
  name: string
  closemodal: () => void
}

const ADD_MOOD = gql`
  mutation updateMoodStudent($id: String, $mood: inputMood) {
    updateMoodStudent(id: $id, mood: $mood) {
      id
      firstname
      lastname
      moods {
        note
        comment
        created_at
      }
    }
  }
`

const MoodModal = ({ id, name, closemodal }: IProps): JSX.Element => {
  const [addMood] = useMutation(ADD_MOOD)
  const [note, setNote] = useState<number>()
  const [comment, setComment] = useState<string>()

  const handleAddMood = async () => {
    try {
      const response = await addMood({
        variables: {
          id,
          mood: {
            note,
            comment
          }
        }
      })
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <Modal>
      <Title>Bonjour {name},</Title>
      <SimpleText>Quel est ton état d'esprit aujourd'hui ?</SimpleText>
      <Form
        onSubmit={async (e: React.FormEvent) => {
          e.preventDefault()
          try {
            handleAddMood()
            closemodal()
          } catch (error) {
            // eslint-disable-next-line no-console
            console.error(error)
          }
        }}
      >
        <Container>
          <Div>
            <Label>
              <SentimentVeryDissatisfiedOutlinedIcon fontSize="large" />
            </Label>
            <Input
              type="radio"
              value="1"
              checked={note === 1}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNote(parseInt(e.target.value, 10))
              }
            />
          </Div>
          <Div>
            <Label>
              <MoodBadOutlinedIcon fontSize="large" />
            </Label>
            <Input
              type="radio"
              value="2"
              checked={note === 2}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNote(parseInt(e.target.value, 10))
              }
            />
          </Div>
          <Div>
            <Label>
              <SentimentSatisfiedIcon fontSize="large" />
            </Label>
            <Input
              type="radio"
              value="3"
              checked={note === 3}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNote(parseInt(e.target.value, 10))
              }
            />
          </Div>
          <Div>
            <Label>
              <MoodOutlinedIcon fontSize="large" />
            </Label>
            <Input
              type="radio"
              value="4"
              checked={note === 4}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNote(parseInt(e.target.value, 10))
              }
            />
          </Div>
          <Div>
            <Label>
              <SentimentVerySatisfiedOutlinedIcon fontSize="large" />
            </Label>
            <Input
              type="radio"
              value="5"
              checked={note === 5}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNote(parseInt(e.target.value, 10))
              }
            />
          </Div>
        </Container>
        {note && <SimpleText>Tu as selectionné l'humeur {note} !</SimpleText>}
        <Button type="submit">
          Ajouter mon humeur <i className="far fa-paper-plane" />
        </Button>
      </Form>
    </Modal>
  )
}

export default MoodModal
