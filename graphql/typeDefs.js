const { gql } = require("graphql-tag");

module.exports = gql`
  type Prod {
    productID: ID
    createdAt: String
  }

  type Specification {
    country: String
    weight: String
    color: [String]!
    material: [String]!
  }

  type Feedback {
    body: String
    rating: Int
  }
  type User {
    id: ID!
    lastName: String
    firstName: String
    email: String
    phone: String
    token: String
    orders: [Prod]!
    cart: [Prod]!
    createdAt: String
    image: String
  }

  type Product {
    name: String
    brand: String
    price: Int
    features: String
    specification: Specification
    feedback: Feedback
    picture: [String]
  }
  input CreateUserInput {
    lastName: String
    firstName: String
    email: String
    phone: String
    password: String
    confirmPassword: String
    image: String
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
    email: String
    password: String
  }
  type Query {
    getUser(id: ID!): User!
    getUsers: [User]!
    getProducts: [Product]!
    getProduct(id: ID!): Product!
    login(input: LoginInput): User!
  }
  type Mutation {
    createUser(input: CreateUserInput): User!
    deleteUser(id: ID):[User]!
    addToCart(input: AddToCartInput): User!
    orderItem(input: OrderItemInput): User!
    getProduct(id: ID): Product!
    getProducts: Product!
  }
`;
