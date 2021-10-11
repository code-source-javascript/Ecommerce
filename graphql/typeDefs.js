const { gql } = require("graphql-tag");

module.exports = gql`
  type Specification {
    name: String
    value: String
  }
  type Feedback {
    userID: ID
    body: String
    rating: Int
    createdAt: String
  }
  type Feature {
    name: String
    value: String
    keyValue: Boolean
  }
  type Address {
    country: String
    street: String
    city: String
  }
  type Cart {
    cartId: ID!
    product: ID!
    name: String
    createdAt: String
    variation: String
    quantity: Int
    shipping: String
    unitPrice: Int
    seller: String
  }

  type Order {
    cartId: ID!
    station: String
    status: String
    createdAt: String
  }
  type User {
    id: ID!
    lastName: String
    firstName: String
    email: String!
    phone: String
    token: String
    orders: [Order]!
    cart: [Cart]!
    createdAt: String
    image: String
    address: Address
  }

  type Product {
    id: ID!
    name: String!
    brand: String!
    category: String!
    discount: Int!
    details: String!
    seller: String
    boxItem: [String]!
    price: Int!
    shipping: String
    variation: [String]!
    quantity: Int!
    features: [Feature]!
    specifications: [Specification]!
    feedback: [Feedback]!
    picture: [String]!
  }
  type Employee {
    id: ID
    employeeId: String
    lastName: String
    firstName: String
    email: String
    phone: String
    address: Address
    position: String
    image: String
    token: String
  }
  type Admin {
    id: ID
    username: String
    token: String
  }
  input AddressInput {
    country: String
    street: String
    city: String
  }
  input CreateUserInput {
    lastName: String
    firstName: String
    email: String
    phone: String
    password: String
    confirmPassword: String
    address: AddressInput
    image: String
  }
  input EmployeeInput {
    employeeId: String
    lastName: String
    firstName: String
    email: String
    phone: String
    address: AddressInput
    position: String
    image: String
  }

  input SpecificationInput {
    name: String
    value: String
  }

  input FeedbackInput {
    userID: ID
    body: String
    rating: Int
    createdAt: String
  }
  input FeatureInput {
    name: String
    value: String
    keyValue: Boolean
  }

  input ChangePasswordInput {
    employeeId: String
    oldPassword: String
    newPassword: String
    confirmPassword: String
  }

  input ProductInput {
    name: String
    brand: String
    category: String
    seller: String
    discount: Int
    details: String
    shipping: String
    boxItem: [String]!
    price: Int
    variation: [String]!
    quantity: Int
    features: [FeatureInput]
    specifications: [SpecificationInput]!
    feedback: [FeedbackInput]!
    picture: [String]!
  }
  type Query {
    getUser(id: ID!): User!
    getUsers: [User]!
    getProducts: [Product]!
    getProduct(id: ID!): Product!
    login(email: String, password: String): User!
    loginEmployee(employeeId: String, password: String): Employee!
    loginAdmin(username: String, password: String): Admin!
  }
  type Mutation {
    createUser(input: CreateUserInput): User!
    deleteUser(id: ID): User!
    addToCart(id: ID, variation: [String]!): User!
    orderItem(id: ID!, station: String): User!
    createEmployee(input: EmployeeInput): Employee!
    deleteEmployee(id: ID): Employee!
    updateEmployee(id: ID, employee: EmployeeInput): Employee!
    addNewProduct(input: ProductInput): Product!
    updateProduct(product: ProductInput, id: ID): Product!
    updateQuantity(id: ID, quantity: Int): Product!
    updateDiscount(id: ID, discount: Int): Product!
    deleteProduct(id: ID): Product!
    createAdmin(username: String, password: String): Admin!
    changePassword(input: ChangePasswordInput): Employee!
  }
`;
