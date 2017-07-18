export default {
    productSubscription: `subscription ProductSubscription($id: ID!) {
  product: Product(filter: {node: {id: $id}}) {
    mutation
    updatedFields
  }
}`,
  productsSubscription: `subscription ProductsSubscription {
  product: Product {
    mutation
    node {
      id
      description
      image
      name
      updatedAt
      createdAt
    }
    updatedFields
    previousValues {
      id
    }
  }
}`
}