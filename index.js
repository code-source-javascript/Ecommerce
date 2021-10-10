const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");
const { MONGO_URI, PORT } = require("./config") || process.env;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    return { req };
  },
});
mongoose
  .connect(MONGO_URI || process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => {
    console.log("Database is Connected");
    return server.listen({ port: PORT });
  })
  .then((res) => {
    console.log(`Server running on ${res.url}`);
  });
