import React, { useState } from 'react'

import MenuItem from '@material-ui/core/MenuItem'
import { Button, Snackbar, TextField } from '@material-ui/core'
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert'

import useSignUpMutation from '../../mutations/useSignUpMutation'

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

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
  const [signUp, mutationResults] = useSignUpMutation()
  const [message, setMessage] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    console.log(e.target)
    const { name, value } = e.target
    setSignUpForm((prevValues) => ({ ...prevValues, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(firstname, lastname, email, password, status)
    signUp(firstname, lastname, email, password, status).then(
      (response: any) => {
        const result = response?.data?.signup
        console.log(result)
        console.log(response)
        if (result && result.success) {
          setMessage(result.message)
          setSignUpForm({ ...signUpFormInitValues })
        }
      }
    )
  }

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }

    setMessage('')
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
        {/* This give a warning cause by MUI use native MUI select instead */}
        <TextField
          id="status"
          select
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
      <Snackbar open={!!message} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          This is a success message!
        </Alert>
      </Snackbar>
      {/* <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        autoHideDuration={2000}
        open={!!message}
        onClose={handleClose}
        message={message}
        color="blue"
        key="topright"
      /> */}
    </>
  )
}

export default SignUp
