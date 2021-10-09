import { gql } from "graphql-tag";

export = gql`
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
        login(username: String!, password: String!): User!
    }
    
`;