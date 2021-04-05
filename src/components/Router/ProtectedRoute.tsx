import React from 'react'
import { Route, Redirect } from 'react-router-dom'

// HOC to protect the route
const ProtectedRoute = ({ component: Component, ...rest }: any) => {
  return (
    <Route
      {...rest}
      render={(props: any) => {
        // Check Authentication here !!!
        const token = localStorage.getItem('token')

        return token ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: '/signin',
              // To keep track of the location to be redirected to the requested page
              state: { from: props.location }
            }}
          />
        )
      }}
    />
  )
}

export default ProtectedRoute
