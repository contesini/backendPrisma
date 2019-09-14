
exports.mutationCreateUser = `
mutation(
  $name: String!
  $email: String!
  $password: String!
) {
  createUser(
    data: { name: $name, email: $email, password: $password}
  ) {
    id
    name
    email
  }
} 
`

exports.updateUser = `
  mutation ($name: String, $password: String, $id: ID!){
    updateUser(data: {
      name: $name
      password: $password
    }, where: {id: $id})
    {
      name
    }
  }
`

exports.authenticate = `
    mutation($email: String!, $password: String!) {
        authenticate(email: $email, password: $password) {
            token
        }
    }
`