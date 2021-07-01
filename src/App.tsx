import React, { useEffect, useState } from 'react'
import { Switch, Route } from 'react-router-dom'
import clsx from 'clsx'

// MUI Import
import {
  ThemeProvider,
  createMuiTheme,
  makeStyles,
  createStyles
} from '@material-ui/core/styles'
import { CssBaseline } from '@material-ui/core'

// Common components
import Header from './components/Header'
import NavBar from './components/NavBar'
import AppRouter from './components/Router/AppRouter'
import SignIn from './components/Router/SignIn'
import UserContext from './components/Context/UserContext'

const drawerWidth = 240
const theme = createMuiTheme({
  palette: {
    primary: {
      // Blue
      main: '#00b5ce',
      // Light blue
      light: '#ccf9ff',
      // Dark Grey
      dark: '#363636'
    },
    secondary: {
      // Light grey
      main: '#f1f3f4',
      // Extra light blue
      light: '#F0FDFF',
      // Average grey
      dark: '#C8D3D4'
    }
  }
})

const useStyles = makeStyles(() =>
  createStyles({
    app: {
      display: 'flex'
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end'
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      marginLeft: -drawerWidth
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      }),
      marginLeft: 0
    }
  })
)

const App = (): JSX.Element => {
  const initialeState = {
    firstname: 'Martin',
    lastname: 'Lamy',
    isStudent: false,
    avatar: ''
  }

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('user') || '{}') || initialeState
  )

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user))
  }, [user])

  const classes = useStyles()
  const [open, setOpen] = useState(false)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <ThemeProvider theme={theme}>
        <Switch>
          <Route exact path="/signin" component={SignIn} />
          <div className={classes.app}>
            <CssBaseline />
            <Header open={open} handleDrawerOpen={handleDrawerOpen} />
            <NavBar
              open={open}
              handleDrawerClose={handleDrawerClose}
              user={user}
            />
            <main
              className={clsx(classes.content, {
                [classes.contentShift]: open
              })}
            >
              <div className={classes.drawerHeader} />
              <AppRouter isStudent={user.isStudent} />
            </main>
          </div>
        </Switch>
      </ThemeProvider>
    </UserContext.Provider>
  )
}

export default App
