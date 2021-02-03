import React, { useState } from 'react'
import { useMutation, gql } from '@apollo/client'
import { makeStyles } from '@material-ui/core/styles'
import MoodModal from './MoodModal'

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

const useStyles = makeStyles((theme) => ({
  button: {
    width: 250,
    margin: '2em auto',
    color: theme.palette.secondary.main,
    backgroundColor: theme.palette.primary.main
  },
  modal: {
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'center',
    width: '50%',
    margin: 'auto',
    backgroundColor: theme.palette.secondary.main,
    borderRadius: '20px',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  name: {
    color: theme.palette.primary.main
  },
  titleModal: {
    display: 'flex',
    flexFlow: 'row nowrap',
    alignSelf: 'flex-start',
    padding: '1.5em'
  },
  text: {
    color: theme.palette.primary.dark,
    padding: '0.4em 0'
  },
  moodList: {
    display: 'flex',
    flexFlow: 'row nowrap'
  },
  formMood: {
    display: 'flex',
    flexFlow: 'column wrap',
    justifyContent: 'center'
  },
  labelMood: {
    display: 'flex',
    flexFlow: 'column nowrap',
    padding: '0.5em 1em',
    color: theme.palette.primary.dark
  }
}))

const MoodModalContainer = ({ id, name, closemodal }: IProps): JSX.Element => {
  const [addMood] = useMutation(ADD_MOOD)
  const [note, setNote] = useState<number>()
  const [comment, setComment] = useState<string | undefined>('')
  const classes = useStyles()

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
      console.error(e)
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
      classes={classes}
      closeModal={closemodal}
    />
  )
}

export default MoodModalContainer
