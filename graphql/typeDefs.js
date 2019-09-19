const { gql } = require('apollo-server');
module.exports = gql`
  type Dog {
    id: ID!
    name: String!
    bookedAt: String!
    walks: [Walk]!
    username: String!
    lastWalked: String
  }
  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
  }
  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }
  type Walk {
    id: ID!
    walkedAt: String!
    username: String!
  }
  type Query {
    getDogs: [Dog]
    getDogsNeedWalked: [Dog]
    getDog(dogId: ID!): Dog
  }
  type Mutation {
    addDog(name: String!, lastWalked: [String]): Dog!
    checkoutDog(dogId: ID!): String!
    walkDog(dogId: ID!): Dog!
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
  }
`;
