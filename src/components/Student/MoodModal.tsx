import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import MoodOutlinedIcon from '@material-ui/icons/MoodOutlined'
import MoodBadOutlinedIcon from '@material-ui/icons/MoodBadOutlined'
import SentimentVeryDissatisfiedOutlinedIcon from '@material-ui/icons/SentimentVeryDissatisfiedOutlined'
import SentimentVerySatisfiedOutlinedIcon from '@material-ui/icons/SentimentVerySatisfiedOutlined'
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

interface IMoodModalProps {
  handleAddMood: () => void
  closeModal: () => void
  comment: string | undefined
  setComment: (a: string) => void
  note: number | undefined
  setNote: (a: number) => void
  name: string
}

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
    color: theme.palette.primary.dark
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
    margin: 'auto',
    padding: '0.5em 1em',
    color: theme.palette.primary.dark
  }
}))

const MoodModal = ({
  handleAddMood,
  closeModal,
  comment,
  setComment,
  note,
  setNote,
  name
}: IMoodModalProps): JSX.Element => {
  const classes = useStyles()

  return (
    <div className={classes.modal}>
      <div className={classes.titleModal}>
        <Typography variant="h4" className={classes.text}>
          Bonjour
          <span className={classes.name}> {name}</span>,
        </Typography>
      </div>
      <Typography variant="h6" className={classes.text}>
        Quel est ton état d'esprit aujourd'hui ?
      </Typography>
      <form
        className={classes.formMood}
        onSubmit={async (e: React.FormEvent) => {
          e.preventDefault()
          try {
            handleAddMood()
            closeModal()
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
        <div className={classes.labelMood}>
          <label htmlFor="commentMood">
            <Typography variant="body1">
              Tu as un commentaire à faire sur cette note ?
            </Typography>
            <input
              className={classes.labelMood}
              id="commentMood"
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </label>
        </div>

        <Button variant="contained" className={classes.button} type="submit">
          Envoyer mon humeur
        </Button>
      </form>
    </div>
  )
}

export default MoodModal
