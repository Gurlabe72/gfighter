const { GraphQLServer } = require("graphql-yoga");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/test5");

const User = mongoose.model("User", {
  text: String,
  complete: Boolean
});

const typeDefs = `
  type Query {
    hello(name: String): String!
  }
  type User {
      id: ID!
text: String!
complete: Boolean!  
  }
  type Mutation {
      createUser( text: String!): User
  }
`;

const resolvers = {
  Query: {
    hello: (_, { name }) => `Hello ${name || "World"}`
  },
  Mutation: {
    createUser: async (_, { text }) => {
      const user = new User({ text, complete: false });
      await user.save();
      return user;
    }
  }
};

const server = new GraphQLServer({ typeDefs, resolvers });
mongoose.connection.once("open", function() {
  server.start(() => console.log("Server is running on localhost:4000"));
});
