import React, { useState } from 'react'

import MenuItem from '@material-ui/core/MenuItem'
import { Button, Snackbar, TextField } from '@material-ui/core'
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert'

import useSignUpMutation from '../../mutations/useSignUpMutation'

const Alert = (props: AlertProps) => (
  /* eslint-disable react/jsx-props-no-spreading */
  <MuiAlert elevation={6} variant="filled" {...props} />
)

const SignUp = (): JSX.Element => {
  const signUpFormInitValues = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    status: ''
  }
  const [
    { firstname, lastname, email, password, status },
    setSignUpForm
  ] = useState(signUpFormInitValues)
  const [signUp] = useSignUpMutation()
  const [{ success, message }, setResponseStatus] = useState({
    success: null,
    message: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target
    setSignUpForm((prevValues) => ({ ...prevValues, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault()
    signUp(firstname, lastname, email, password, status)
      .then((response: any) => {
        const result = response?.data?.signup
        if (result && result.success) {
          setResponseStatus({
            success: result.success,
            message: result.message
          })
          setSignUpForm({ ...signUpFormInitValues })
        }
      })
      .catch((err: Error) => {
        setResponseStatus((prevState) => ({
          ...prevState,
          message: err.message
        }))
      })
  }

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }

    setResponseStatus((prevState) => ({ ...prevState, message: '' }))
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <TextField
          required
          id="firstname"
          label="Prénom"
          name="firstname"
          value={firstname}
          onChange={handleChange}
        />
        <TextField
          required
          id="lastname"
          label="Nom"
          name="lastname"
          value={lastname}
          onChange={handleChange}
        />
        <TextField
          required
          id="email"
          label="Email"
          name="email"
          value={email}
          onChange={handleChange}
        />
        <TextField
          required
          id="password"
          label="Password"
          name="password"
          value={password}
          type="password"
          onChange={handleChange}
        />
        {/* This give a warning cause by MUI... can use MUI native select instead */}
        <TextField
          required
          select
          id="status"
          label="Status"
          name="status"
          value={status}
          onChange={handleChange}
        >
          {['STUDENT', 'TEACHER'].map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        <Button type="submit" color="primary" variant="outlined">
          Enregistrer
        </Button>
      </form>
      <Snackbar
        open={!!message}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={success ? 'success' : 'error'}>
          {message}
        </Alert>
      </Snackbar>
    </>
  )
}

export default SignUp
