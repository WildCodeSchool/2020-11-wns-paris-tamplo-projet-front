import React from 'react'
import { Switch, Route, Link } from 'react-router-dom'

import Student from './components/Student'
import Teacher from './components/Teacher'

import { Nav, ButtonNav } from "./styles/element";

const App = () => {
  return (
    <div className="app-container">
      <Switch>
        <Route exact path='/'>
          <Nav>
            <ButtonNav>
              <Link to='/student'>Student</Link>
            </ButtonNav>
            <ButtonNav>
              <Link to='/teacher'>Teacher</Link>
            </ButtonNav>
          </Nav>
        </Route>
        <Route path="/student" component={Student} />
        <Route path="/teacher" component={Teacher} />
      </Switch>
    </div>
  )
}

export default App
