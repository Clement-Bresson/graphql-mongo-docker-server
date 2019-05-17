const { ApolloServer } = require('apollo-server');

const models = require('./models');

require('./dbConnect');

const typeDefs = require('../graphql/typeDefs');
const resolvers = require('../graphql/resolvers.js');
const { CommentAPI, PostAPI, UserAPI } = require('../graphql/dataSources.js');

const dataSources = () => ({
  commentAPI: new CommentAPI({ models }),
  postAPI: new PostAPI({ models }),
  userAPI: new UserAPI({ models })
});

/* eslint-disable no-unused-vars */
const context = async ({ req }) => {
  // TODO: Use context for authentication (with info in req)
  return {};
};
/* eslint-enable no-unused-vars */

const server = new ApolloServer({ context, dataSources, resolvers, typeDefs });

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`); //eslint-disable-line
});

module.exports = {
  dataSources,
  context,
  typeDefs,
  resolvers,
  ApolloServer,
  CommentAPI,
  PostAPI,
  UserAPI,
  models,
  server
};
