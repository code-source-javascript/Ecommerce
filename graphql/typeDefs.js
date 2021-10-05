const { gql } = require("graphql-tag");

module.exports = gql`
  type Prod {
    productID: ID
    createdAt: String
  }
  type User {
    id: ID!
    lastName: String
    firstName: String
    email: String
    phone: String
    orders: [Prod]!
    cart: [Prod]!
    createdAt: String
  }
  input CreateUserInput {
    lastName: String
    firstName: String
    email: String
    phone: String
    password: String
    confirmPassword: String
    createdAt: String
  }
  input AddToCartInput {
    productID: ID
    createdAt: String
  }

  input OrderItemInput {
    productId: ID!
    createdAt: String
  }
  input LoginInput {
    username: String
    password: String
  }
  type Query {
    getUser(id: ID!): User!
    getUsers: User!
    login(input: LoginInput): User!
  }
  type Mutation {
    createUser(input: CreateUserInput): User!
    deleteUser(id: ID): User
    addToCart(input: AddToCartInput): User!
    orderItem(input: OrderItemInput): User!
  }
`;
