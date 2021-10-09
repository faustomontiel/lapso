"use strict";
const graphql_tag_1 = require("graphql-tag");
module.exports = (0, graphql_tag_1.gql) `
    type Query{
        sayHi: String!
        getUsers: [User!]!
    }
    type User {
        id: String!
        email: String!
        token: String!
        username: String!
    }
    input RegisterInput {
        username: String!
        password: String!
        confirmPassword: String!
        email: String!
    } 

    type Mutation{
        register(registerInput: RegisterInput): User!
    }

`;
