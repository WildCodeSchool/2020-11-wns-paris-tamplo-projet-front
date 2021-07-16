import React, { useContext, useState } from 'react'
import { useLocation, Redirect } from 'react-router-dom'

import useLoginMutation from '../../mutations/useLoginMutation'
import UserContext from '../Context/UserContext'

const SignIn = (): JSX.Element => {
  const loginFormInitValues = {
    email: '',
    password: ''
  }
  const [{ email, password }, setLoginForm] = useState(loginFormInitValues)
  const [login] = useLoginMutation()
  const [redirectToReferrer, setRedirectToReferrer] = useState(false)
  const { setUser } = useContext(UserContext)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target
    setLoginForm((prevValues) => ({ ...prevValues, [name]: value }))
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    login(email, password).then((res: any) => {
      const userData = res.data.login.user
      setUser((prevUser: any) => ({
        ...prevUser,
        ...userData,
        isStudent: userData.status === 'STUDENT'
      }))
      setRedirectToReferrer(true)
    })
  }

  const { state }: any = useLocation()

  if (redirectToReferrer === true) {
    // Redirect to the coming page or to the homepage (default)
    return <Redirect to={state?.from || '/'} />
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" name="email" value={email} onChange={handleChange} />
        <input
          name="password"
          type="password"
          value={password}
          onChange={handleChange}
        />
        <button type="submit">Login</button>
      </form>
      {state?.from && (
        <div>
          <p>You must be logged in to view this page</p>
        </div>
      )}
    </>
  )
}

export default SignIn
