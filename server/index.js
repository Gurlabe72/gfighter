const { GraphQLServer } = require("graphql-yoga");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/test5");

const User = mongoose.model("User", {
  name: String,
  bio: String,
  style: String,
  image_url: String,
  strength: String,
  complete: Boolean
});

const typeDefs = `
  type Query {
    hello(name: String): String!
    users: [User]
  }
  type User {
      id: ID!
name: String!
bio: String!
style: String!
image_url: String!
strength: String!
complete: Boolean!  
  }
  type Mutation {
      createUser( name: String!, bio: String!, style: String!, image_url: String!, strength: String! ): User
  }
`;

const resolvers = {
  Query: {
    hello: (_, { name }) => `Hello ${name || "World"}`,
    users: () => User.find()
  },
  Mutation: {
    createUser: async (_, { name, bio, style, image_url, strength }) => {
      const user = new User({
        name,
        bio,
        style,
        image_url,
        strength,
        complete: false
      });
      await user.save();
      return user;
    }
  }
};

const server = new GraphQLServer({ typeDefs, resolvers });
mongoose.connection.once("open", function() {
  server.start(() => console.log("Server is running on localhost:4000"));
});
