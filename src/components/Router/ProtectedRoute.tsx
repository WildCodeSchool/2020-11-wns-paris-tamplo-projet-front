import React from 'react'
import { Route, Redirect, RouteProps } from 'react-router-dom'

interface IPrivateRouteProps extends RouteProps {
  component: any
}

const ProtectedRoute = ({
  component: Component,
  ...rest
}: IPrivateRouteProps): JSX.Element => {
  return (
    /* eslint-disable react/jsx-props-no-spreading */
    <Route
      {...rest}
      render={(props: any) => {
        const token = localStorage.getItem('token')
        return token ? (
          <Component {...props} />
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
