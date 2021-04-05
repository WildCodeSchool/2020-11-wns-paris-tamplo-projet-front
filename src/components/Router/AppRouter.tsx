import React from 'react'
import { Switch, Route } from 'react-router-dom'

// Only logged users can access to the protected routes
import ProtectedRoute from './ProtectedRoute'

// Public Pages
import SignIn from './SignIn'

// Student components
import StudentContainer from '../Student/StudentContainer'
import StudentProfil from '../Student/StudentProfil'
import StudentQuiz from '../Student/StudentQuiz'
import StudentResource from '../Student/StudentResource'
import StudentStats from '../Student/StudentStats'

// Teacher components
import TeacherHome from '../Teacher/TeacherHome'
import TeacherContainer from '../Teacher/TeacherContainer'
import TeacherClassroom from '../Teacher/TeacherClassroom'
import TeacherQuiz from '../Teacher/TeacherQuiz'
import TeacherResource from '../Teacher/TeacherResource'
import TeacherQuizzFollow from '../Teacher/TeacherQuizzFollow'
import TeacherQuizEditor from '../Teacher/TeacherQuizEditor'

const AppRouter = ({ isStudent }: { isStudent: boolean }): JSX.Element => (
  <Switch>
    <Route exact path="/signin" component={SignIn} />
    <ProtectedRoute
      exact
      path="/"
      component={isStudent ? StudentContainer : TeacherHome}
    />
    <ProtectedRoute
      exact
      path="/quiz"
      component={isStudent ? StudentQuiz : TeacherQuiz}
    />
    <ProtectedRoute
      exact
      path="/ressources"
      component={isStudent ? StudentResource : TeacherResource}
    />
    {isStudent && (
      <>
        <ProtectedRoute
          exact
          path="/profil/mes-stats"
          component={StudentStats}
        />
        <ProtectedRoute exact path="/profil" component={StudentProfil} />
      </>
    )}
    {!isStudent && (
      <>
        <ProtectedRoute
          exact
          path="/classe/suivi-des-humeurs"
          component={TeacherContainer}
        />
        <ProtectedRoute
          exact
          path="/classe/suivi-des-quiz"
          component={TeacherQuizzFollow}
        />
        <ProtectedRoute exact path="/classe" component={TeacherClassroom} />
        <ProtectedRoute
          exact
          path="/quiz/editor"
          component={TeacherQuizEditor}
        />
      </>
    )}
  </Switch>
)

export default AppRouter
