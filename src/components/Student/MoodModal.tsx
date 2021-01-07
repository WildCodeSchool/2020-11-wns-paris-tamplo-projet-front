import React, { Dispatch, SetStateAction } from 'react'

import MoodOutlinedIcon from '@material-ui/icons/MoodOutlined'
import MoodBadOutlinedIcon from '@material-ui/icons/MoodBadOutlined'
import SentimentVeryDissatisfiedOutlinedIcon from '@material-ui/icons/SentimentVeryDissatisfiedOutlined'
import SentimentVerySatisfiedOutlinedIcon from '@material-ui/icons/SentimentVerySatisfiedOutlined'
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

interface IMoodModalProps {
  classes: Record<
    | 'button'
    | 'text'
    | 'modal'
    | 'name'
    | 'titleModal'
    | 'moodList'
    | 'formMood'
    | 'labelMood',
    string
  >
  handleAddMood: () => void
  closeModal: () => void
  comment: string | undefined
  setComment: Dispatch<SetStateAction<string | undefined>>
  note: number | undefined
  setNote: Dispatch<SetStateAction<number | undefined>>
  name: string
}

const MoodModal = ({
  handleAddMood,
  classes,
  closeModal,
  comment,
  setComment,
  note,
  setNote,
  name
}: IMoodModalProps): JSX.Element => {
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

        {note && (
          <Typography variant="body2">
            <label htmlFor="commentMood">
              Tu as un commentaire à faire ?
              <input
                id="commentMood"
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </label>
          </Typography>
        )}
        <Button variant="contained" className={classes.button} type="submit">
          Envoyer mon humeur
        </Button>
      </form>
    </div>
  )
}

export default MoodModal
