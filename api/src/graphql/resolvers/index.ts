const usersResolvers = require('./users')

export = {
    Query:{
        ...usersResolvers.Query
    },
    Mutation:{
        ...usersResolvers.Mutation
    }
}    