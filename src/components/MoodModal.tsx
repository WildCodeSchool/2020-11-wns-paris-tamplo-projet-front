import React, { useState } from 'react'
import { useMutation, gql } from '@apollo/client'

import MoodOutlinedIcon from '@material-ui/icons/MoodOutlined'
import MoodBadOutlinedIcon from '@material-ui/icons/MoodBadOutlined'
import SentimentVeryDissatisfiedOutlinedIcon from '@material-ui/icons/SentimentVeryDissatisfiedOutlined'
import SentimentVerySatisfiedOutlinedIcon from '@material-ui/icons/SentimentVerySatisfiedOutlined'
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'

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
  // eachMood: {
  //   display: 'flex',
  //   flexDirection: 'column',
  //   alignItems: 'center'
  // },
  formMood: {
    display: 'flex',
    flexFlow: 'column wrap',
    justifyContent: 'center'
  },
  labelMood: {
    display: 'flex',
    flexFlow: 'column nowrap',
    padding: '0.5em 1em'
  }
}))

const MoodModal = ({ id, name, closemodal }: IProps): JSX.Element => {
  const [addMood] = useMutation(ADD_MOOD)
  const [note, setNote] = useState<number>()
  const [comment, setComment] = useState<string>()
  const classes = useStyles()

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
    <div className={classes.modal}>
      <div className={classes.titleModal}>
        <Typography variant="h4" className={classes.text}>
          Bonjour
          <span className={classes.name}> {name}</span>,
        </Typography>
      </div>
      <Typography variant="body1" className={classes.text}>
        Quel est ton état d'esprit aujourd'hui ?
      </Typography>
      <form
        className={classes.formMood}
        onSubmit={async (e: React.FormEvent) => {
          e.preventDefault()
          try {
            handleAddMood()
            closemodal()
          } catch (error) {
            console.error(error)
          }
        }}
      >
        <div className={classes.moodList}>
          <label htmlFor="first" className={classes.labelMood}>
            <SentimentVeryDissatisfiedOutlinedIcon
              fontSize="large"
              className={classes.text}
            />
            <input
              id="first"
              type="radio"
              value="1"
              checked={note === 1}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNote(parseInt(e.target.value, 10))
              }
            />
          </label>

          <label htmlFor="second" className={classes.labelMood}>
            <MoodBadOutlinedIcon fontSize="large" className={classes.text} />
            <input
              id="second"
              type="radio"
              value="2"
              checked={note === 2}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNote(parseInt(e.target.value, 10))
              }
            />
          </label>

          <label htmlFor="third" className={classes.labelMood}>
            <SentimentSatisfiedIcon fontSize="large" className={classes.text} />
            <input
              id="third"
              type="radio"
              value="3"
              checked={note === 3}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNote(parseInt(e.target.value, 10))
              }
            />
          </label>

          <label htmlFor="fourth" className={classes.labelMood}>
            <MoodOutlinedIcon fontSize="large" className={classes.text} />
            <input
              id="fourth"
              type="radio"
              value="4"
              checked={note === 4}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNote(parseInt(e.target.value, 10))
              }
            />
          </label>

          <label htmlFor="fifth" className={classes.labelMood}>
            <SentimentVerySatisfiedOutlinedIcon
              fontSize="large"
              className={classes.text}
            />
            <input
              id="fifth"
              type="radio"
              value="5"
              checked={note === 5}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNote(parseInt(e.target.value, 10))
              }
            />
          </label>
        </div>

        {note && (
          <Typography variant="body2">
            Tu as selectionné l'humeur {note} !
          </Typography>
        )}
        <Button variant="contained" className={classes.button}>
          Envoyer mon humeur
        </Button>
      </form>
    </div>
  )
}

export default MoodModal
