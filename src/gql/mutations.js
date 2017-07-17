export default {
    createUser: `mutation CreateUser($email: String!, $password: String!, $firstName: String, $middleName: String, $lastName: String, $image: String) {
  user: createUser(authProvider: {email: {email: $email, password: $password}}, firstName: $firstName, middleName: $middleName, lastName: $lastName, image: $image) {
    id
    email
  }
}`,
    signInUser: `mutation SignInUser($email: String!, $password: String!) {
  user: signinUser(email: {email: $email, password: $password}) {
    token
    user {
      email
      image
      id
    }
  }
}`,
    createProduct: `mutation CreateProduct($id: ID!, $image: String!, $name: String!, $description: String!) {
  product: createProduct(image: $image, description: $description, name: $name) {
    id
    image
    createdAt
    updatedAt
  }
}`,
    updateProduct: `mutation UpdateProduct($id: ID!, $image: String!, $name: String!, $description: String!) {
  product: updateProduct(id: $id, image: $image, description: $description, name: $name) {
    id
    image
    createdAt
    updatedAt
  }
}`,
    deleteProduct: `mutation DeleteProduct($id: ID!) {
  product: deleteProduct(id: $id) {
    id
    name
  }
}
`,
    saveEvent: `mutation SaveEvent($name: String!, $description: String!, $startDate: DateTime!, $endDate: DateTime!) {
  event: createEvent(name: $name, description: $description, startDate: $startDate, endDate: $endDate) {
    name
    description
    endDate
    startDate
  }
}`

}