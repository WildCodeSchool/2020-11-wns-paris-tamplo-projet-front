import React from 'react'
import { Switch, Route, Link } from 'react-router-dom'

import Student from './components/Student'
import Teacher from './components/Teacher'

import { Nav } from './styles/element'
import { Button } from '@material-ui/core'

const App = () => {
  return (
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
        <Route path="/student" component={Student} />
        <Route path="/teacher/:mdp" component={Teacher} />
      </Switch>
    </div>
  )
}

export default App
