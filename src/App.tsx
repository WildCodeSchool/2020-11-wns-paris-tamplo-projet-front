import React, { useState } from 'react'
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

// Student components
import StudentContainer from './components/Student/StudentContainer'
import StudentProfil from './components/Student/StudentProfil'
import StudentQuiz from './components/Student/StudentQuiz'
import StudentResource from './components/Student/StudentResource'
import StudentStats from './components/Student/StudentStats'

// Teacher components
import TeacherHome from './components/Teacher/TeacherHome'
import TeacherContainer from './components/Teacher/TeacherContainer'
import TeacherClassroom from './components/Teacher/TeacherClassroom'
import TeacherQuiz from './components/Teacher/TeacherQuiz'
import TeacherResource from './components/Teacher/TeacherResource'
import TeacherQuizzFollow from './components/Teacher/TeacherQuizzFollow'
import TeacherQuizEditor from './components/Teacher/TeacherQuizEditor'

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
      dark: '#f1f3f4'
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

const user = {
  firstname: 'Martin',
  lastname: 'Lamy',
  isStudent: false,
  avatar:
    'https://cdn.pixabay.com/photo/2016/11/18/19/07/happy-1836445_1280.jpg'
}

const App = (): JSX.Element => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [isStudent, setIsStudent] = useState(user.isStudent)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.app}>
        <CssBaseline />
        <Header open={open} handleDrawerOpen={handleDrawerOpen} />
        <NavBar open={open} handleDrawerClose={handleDrawerClose} user={user} />
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open
          })}
        >
          <div className={classes.drawerHeader} />
          <Switch>
            <Route
              path="/"
              exact
              component={isStudent ? StudentContainer : TeacherHome}
            />
            {!isStudent && (
              <Route
                path="/classe/suivi-des-humeurs"
                component={TeacherContainer}
              />
            )}
            {!isStudent && (
              <Route
                path="/classe/suivi-des-quiz"
                component={TeacherQuizzFollow}
              />
            )}
            {!isStudent && (
              <Route path="/classe" component={TeacherClassroom} />
            )}

            {isStudent && (
              <Route path="/profil/mes-stats" component={StudentStats} />
            )}

            {isStudent && <Route path="/profil" component={StudentProfil} />}
            {!isStudent && (
              <Route path="/quiz/editor" component={TeacherQuizEditor} />
            )}
            <Route
              path="/quiz"
              component={isStudent ? StudentQuiz : TeacherQuiz}
            />
            <Route
              path="/ressources"
              component={isStudent ? StudentResource : TeacherResource}
            />
          </Switch>
        </main>
      </div>
    </ThemeProvider>
  )
}

export default App
