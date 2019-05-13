const { ApolloServer } = require('apollo-server');
const typeDefs = require('./graphql/schema');
const createStore = require('./db');
const PostAPI = require('./graphql/datasources/post');
const resolvers = require('./graphql/resolvers');

const store = createStore();

const dataSources = () => ({
  postAPI: new PostAPI({ store })
});

const server = new ApolloServer({ dataSources, resolvers, typeDefs });

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`); //eslint-disable-line
});
