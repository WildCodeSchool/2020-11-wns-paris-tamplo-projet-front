import React from 'react'
import ReactDOM from 'react-dom'

import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
  from
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'
import { BrowserRouter } from 'react-router-dom'
import reportWebVitals from './reportWebVitals'

import App from './App'

import './index.css'

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_SERVER_URL
})

// Middleware to add authorization token to every gql call in headers
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token')
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, extensions, locations, path }: any) => {
      switch (extensions.code) {
        // Apollo Server sets code to UNAUTHENTICATED when an AuthenticationError is thrown in a resolver
        case 'UNAUTHENTICATED': {
          localStorage.removeItem('token')
          // eslint-disable-next-line no-restricted-globals
          location.reload()
          break
        }
        default:
          console.error(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          )
      }
    })
  }

  if (networkError) {
    console.error(' [Network error]:', networkError)
  }
})

const client = new ApolloClient({
  // The `from` function combines an array of individual links into a link chain
  link: from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache({ addTypename: false })
})

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
