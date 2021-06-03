import React, { useState } from 'react'
import { useMutation, gql } from '@apollo/client'
import MoodModal from './MoodModal'
import errorLogger from '../../utils/errorLogger'

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

const MoodModalContainer = ({ id, name, closemodal }: IProps): JSX.Element => {
  const [addMood] = useMutation(ADD_MOOD)
  const [note, setNote] = useState<number>()
  const [comment, setComment] = useState<string | undefined>('')

  const handleAddMood = async () => {
    try {
      await addMood({
        variables: {
          id,
          mood: {
            note,
            comment
          }
        }
      })
    } catch (e) {
      errorLogger(e, {
        extraInfos: "Can't add mood",
        state: {
          id,
          mood: {
            note,
            comment
          }
        }
      })
    }
  }

  return (
    <MoodModal
      note={note}
      name={name}
      comment={comment}
      setComment={setComment}
      setNote={setNote}
      handleAddMood={handleAddMood}
      closeModal={closemodal}
    />
  )
}

export default MoodModalContainer
