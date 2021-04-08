import { useMutation, gql } from '@apollo/client'

const LoginMutationGQL = gql`
  mutation login($userCredentials: userCredentials) {
    login(userCredentials: $userCredentials) {
      token
      user {
        id
        email
      }
    }
  }
`

const useLoginMutation = (): any => {
  const [mutation, mutationResults] = useMutation(LoginMutationGQL, {
    onCompleted: (data) => {
      localStorage.setItem('token', data.login.token)
    }
  })
  const login = (email: string, password: string) => {
    return mutation({
      variables: {
        userCredentials: {
          email,
          password
        }
      }
    })
  }
  return [login, mutationResults] as const
}

export { useLoginMutation as default }
