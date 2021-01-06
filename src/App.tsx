import React from 'react'
import { Switch, Route, Link } from 'react-router-dom'

import { Button } from '@material-ui/core'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import StudentContainer from './components/StudentContainer'
import TeacherContainer from './components/TeacherContainer'

import { Nav } from './styles/element'

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
      // White
      light: '#ffffff',
      // Average grey
      dark: '#f1f3f4'
    }
  }
})

const App = (): JSX.Element => {
  return (
    <ThemeProvider theme={theme}>
      <div className="app-container">
        <Switch>
          <Route exact path="/">
            <Nav>
              <Button
                variant="outlined"
                color="secondary"
                component={Link}
                to="/student"
              >
                Student
              </Button>
              <Button
                variant="outlined"
                color="primary"
                component={Link}
                to="/teacher"
              >
                Teacher
              </Button>
            </Nav>
          </Route>
          <Route path="/student" component={StudentContainer} />
          <Route path="/teacher" component={TeacherContainer} />
        </Switch>
      </div>
    </ThemeProvider>
  )
}

export default App
