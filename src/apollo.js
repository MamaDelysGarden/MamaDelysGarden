import ApolloClient, {
  createBatchingNetworkInterface
} from 'apollo-client'
import {
  SubscriptionClient,
  addGraphQLSubscriptions
} from 'subscriptions-transport-ws'


const endpoints = {
  "https": "https://api.graph.cool/simple/v1/cj3q050xggdz10148ugqfjfir",
  "wss": "wss://subscriptions.graph.cool/v1/cj3q050xggdz10148ugqfjfir"
}
const wsClient = new SubscriptionClient(endpoints.wss, {
  reconnect: true,
})


const networkInterface = createBatchingNetworkInterface({
  uri: endpoints.https,
  batchInterval: 10,
  queryDeduplication: true,
  transportBatching: true
})

networkInterface.use([{
  applyBatchMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {}
    }

    if (localStorage.getItem("userToken")) {
      req.options.headers.Authorization = `Bearer ${localStorage.getItem("userToken")}`;

    }
    next()
  },
}])
const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
  networkInterface,
  wsClient
)

const client = new ApolloClient({
  networkInterface: networkInterfaceWithSubscriptions,
  dataIdFromObject: o => o.id,
  connectToDevTools: false,
});

export default client;