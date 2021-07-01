import React, { useContext } from 'react'
import clsx from 'clsx'

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { AppBar, Toolbar, IconButton } from '@material-ui/core'
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew'
import MenuIcon from '@material-ui/icons/Menu'
import { useHistory } from 'react-router-dom'
import UserContext from './Context/UserContext'

const drawerWidth = 240

interface IProps {
  open: boolean
  handleDrawerOpen: () => void
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    hide: {
      display: 'none'
    },
    title: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between'
    }
  })
)

const Header = ({ open, handleDrawerOpen }: IProps): JSX.Element => {
  const { setUser } = useContext(UserContext)
  const classes = useStyles()
  const history = useHistory()

  const logout = () => {
    console.log('Logging out')
    // Effacer tous les éléments
    localStorage.clear()
    setUser({})
    history.push('/')
  }

  return (
    <AppBar
      position="fixed"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: open
      })}
    >
      <Toolbar>
        <IconButton
          color="secondary"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          className={clsx(classes.menuButton, open && classes.hide)}
        >
          <MenuIcon />
        </IconButton>
        <div className={classes.title}>
          <div>Titre de la page</div>
          <IconButton color="secondary" onClick={logout}>
            <PowerSettingsNewIcon />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default Header
