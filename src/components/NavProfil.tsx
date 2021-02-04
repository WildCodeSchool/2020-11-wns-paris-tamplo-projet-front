import React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Avatar } from '@material-ui/core'

import { IUser } from '../types/data'

interface IProps {
  user: IUser
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      height: '22%',
      backgroundColor: theme.palette.secondary.light,
      display: 'flex',
      'flex-direction': 'column',
      'justify-content': 'center',
      'align-items': 'center'
    },
    name: {
      'font-size': '18px',
      'font-weight': 'bold'
    },
    avatar: {
      width: theme.spacing(7),
      height: theme.spacing(7)
    }
  })
)

const NavProfil = ({
  user: { lastname, firstname, avatar }
}: IProps): JSX.Element => {
  const classes = useStyles()
  return (
    <div className={classes.container}>
      <Avatar
        alt={`${firstname} ${lastname}`}
        src={avatar}
        className={classes.avatar}
      />
      <p className={classes.name}>
        {firstname} {lastname}
      </p>
    </div>
  )
}

export default NavProfil
