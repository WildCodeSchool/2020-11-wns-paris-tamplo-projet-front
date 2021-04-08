import { useMutation, gql } from '@apollo/client'

const SignUpMutationGQL = gql`
  mutation signup($user: inputSignUp) {
    signup(user: $user) {
      success
      message
    }
  }
`

const useSignUpMutation = (): any => {
  const [mutation, mutationResults] = useMutation(SignUpMutationGQL)
  const signUp = (
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    status: string
  ) => {
    return mutation({
      variables: {
        user: {
          firstname,
          lastname,
          email,
          password,
          status
        }
      }
    })
  }
  return [signUp, mutationResults] as const
}

export { useSignUpMutation as default }
