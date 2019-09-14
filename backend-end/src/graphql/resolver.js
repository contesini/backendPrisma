import lodash from 'lodash'
import User from './resolvers/user.resolver'
import CustomResolver from './resolvers/custom.resolver'


const resolvers = lodash.merge(
    User.Resolver, {
    Query:
        lodash.merge(
            User.Query,
        ),
    Mutation:
        lodash.merge(
            User.Mutation,
            CustomResolver.Mutation
        )
})


export default resolvers