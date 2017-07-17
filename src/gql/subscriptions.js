export default {
    productSubscription: `subscription ProductSubscription($id: ID!) {
  product: Product(filter: {node: {id: $id}}) {
    mutation
    updatedFields
  }
}
`
}