import { ApolloError } from '@apollo/client'

const errorLogger = (
  error: { networkError: any; graphQLErrors: any },
  extra: { extraInfos: any; state: any }
): void => {
  if (!error) return

  if (error instanceof ApolloError) {
    const { networkError, graphQLErrors } = error
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path, extensions }) =>
        console.error(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}, ExtraInfos: ${
            extra?.extraInfos || ''
          }, Extensions: ${JSON.stringify(extensions, null, 4)},
          state: ${JSON.stringify(extra?.state || {})}`
        )
      )
    }

    if (networkError) {
      console.error(
        `[Network error]: ${networkError}, ExtraInfos: ${
          extra?.extraInfos || ''
        }, Error: ${JSON.stringify(error, null, 4)},
        state: ${JSON.stringify(extra?.state || {})}`
      )
    }
    return
  }

  console.error(
    `[Unknown error]: , ${extra?.extraInfos || ''}, ${error}, ${JSON.stringify(
      extra?.state || {}
    )}`
  )
}

export default errorLogger
