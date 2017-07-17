import queries from './queries';
import mutations from './mutations';
import subscriptions from './subscriptions';
import gql from 'graphql-tag';

const convert = tags => Object.keys(tags).forEach(key => tags[key] = gql(tags[key]));
convert(queries);
convert(mutations);
convert(subscriptions);

export default {
    queries,
    mutations,
    subscriptions
}