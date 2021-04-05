import React, { useState } from 'react'
import { useLocation, Redirect } from 'react-router-dom'

import useLoginMutation from '../../mutations/useLoginMutation'

const SignIn = (): JSX.Element => {
  const loginFormInitValues = {
    email: '',
    password: ''
  }
  const [loginForm, setLoginForm] = useState(loginFormInitValues)
  const [login, mutationResults] = useLoginMutation()
  const [redirectToReferrer, setRedirectToReferrer] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target
    setLoginForm((prevValues) => ({ ...prevValues, [name]: value }))
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    login(loginForm.email, loginForm.password).then((res) => {
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
        <input
          type="text"
          name="email"
          value={loginForm.email}
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          value={loginForm.password}
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
