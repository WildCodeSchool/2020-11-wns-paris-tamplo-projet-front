import React from 'react'
import { Switch, Route, Link } from 'react-router-dom'

import { Button } from '@material-ui/core'
import Student from './components/Student'
import Teacher from './components/Teacher'

import { Nav } from './styles/element'

const App = (): JSX.Element => {
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
        <Route path="/teacher">
          <p>Entrez l'url secrète</p>
        </Route>
      </Switch>
    </div>
  )
}

export default App
