import React, { useState } from 'react'
import axios from 'axios'

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
  id: number
  name: string
  closemodal: () => void
}

const MoodModal = ({ id, name, closemodal }: IProps): JSX.Element => {
  const [note, setNote] = useState<number>()

  return (
    <Modal>
      <Title>Bonjour {name},</Title>
      <SimpleText>Quel est ton état d'esprit aujourd'hui ?</SimpleText>
      <Form
        onSubmit={async (e: React.FormEvent) => {
          e.preventDefault()
          try {
            await axios.post('/moods', {
              student_id: id,
              note
            })
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
