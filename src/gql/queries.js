export default {
    productsCount: `query AllProductsCount($first: Int, $skip: Int, $search: String) {
            count: _allProductsMeta(first: $first, skip: $skip, filter: {name_contains: $search}) {
                count
            }
        }`,
    products: `query AllProducts($first: Int, $skip: Int, $search: String) {
            products: allProducts(first: $first, skip: $skip, filter: {name_contains: $search}) {
                id
                image
                name
                description
            }
        }`,
    product: `query Product($id: ID!) {
          product: Product(id: $id) {
            image
            description
            id
            createdAt
            updatedAt
            name
          }
        }`,
    eventsCount: `query AllEventsCount($first: Int, $skip: Int, $search: String) {
            count: _allEventsMeta(first: $first, skip: $skip, filter: {name_contains: $search}) {
                count
            }
        }`,
    events: `query AllEvents($first: Int, $skip: Int, $search: String) {
            events: allEvents(first: $first, skip: $skip, filter: {name_contains: $search}) {
                id
                name
                description
                image
            }
        }`,
    user: `query User($email: String!) {
        user: User(email: $email) {
            id
            email
            image
            firstName
            middleName
            lastName
        }
    }`,
    currentUser: `query CurrentUser {
        currentUser: user {
            id
            firstName
            lastName
            middleName
            email
            image
        }    
    }`
}