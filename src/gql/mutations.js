export default {
  createUser: `mutation CreateUser($email: String!, $password: String!) {
  user: createUser(authProvider: {email: {email: $email, password: $password}}) {
    id
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
  createProduct: `mutation CreateProduct($image: String!, $name: String!, $description: String!) {
  product: createProduct(image: $image, description: $description, name: $name) {
    id
    image
    name
    description
    createdAt
    updatedAt
  }
}`,
  updateProduct: `mutation UpdateProduct($id: ID!, $image: String!, $name: String!, $description: String!) {
  product: updateProduct(id: $id, image: $image, description: $description, name: $name) {
    id
    image
    name
    description
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
  createEvent: `mutation CreateEvent($image: String!, $name: String!, $description: String!) {
  event: createEvent(image: $image, description: $description, name: $name) {
    id
    image
    name
    description
    createdAt
    updatedAt
  }
}`,
  updateEvent: `mutation UpdateEvent($id: ID!, $image: String!, $name: String!, $description: String!) {
  event: updateEvent(id: $id, image: $image, description: $description, name: $name) {
    id
    image
    name
    description
    createdAt
    updatedAt
  }
}`,
  deleteEvent: `mutation DeleteEvent($id: ID!) {
  event: deleteEvent(id: $id) {
    id
    name
  }
}
`,

}