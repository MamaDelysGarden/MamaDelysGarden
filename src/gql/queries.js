export default {
    productsCount: `query AllProductsCount($first: Int, $skip: Int, $search: String, $category: Category) {
            count: _allProductsMeta(first: $first, skip: $skip, filter: {name_contains: $search, category: $category}) {
                count
            }
        }`,
    products: `query AllProducts($first: Int, $skip: Int, $search: String, $category: Category) {
            products: allProducts(first: $first, skip: $skip, filter: {name_contains: $search, category: $category}) {
                id
                image
                name
                description
                createdAt
            }
        }`,
    product: `query Product($id: ID!) {
          item: Product(id: $id) {
            image
            description
            id
            createdAt
            updatedAt
            category
            name
          }
        }`,
    event: `query Event($id: ID!) {
          item: Event(id: $id) {
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
                createdAt
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
