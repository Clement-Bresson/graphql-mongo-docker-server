const { HttpLink } = require('apollo-link-http');
const fetch = require('node-fetch');
const { execute, toPromise } = require('apollo-link');

module.exports.toPromise = toPromise;

const {
  context: defaultContext,
  typeDefs,
  resolvers,
  ApolloServer,
  CommentAPI,
  PostAPI,
  UserAPI,
  models
} = require('../server');

/**
 * Integration testing utils
 */
const constructTestServer = ({ context = defaultContext } = {}) => {
  const userAPI = new UserAPI({ models });
  const postAPI = new PostAPI({ models });
  const commentAPI = new CommentAPI({ models });

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({ commentAPI, postAPI, userAPI }),
    context
  });

  return { server, userAPI, postAPI, commentAPI };
};

module.exports.constructTestServer = constructTestServer;

/**
 * e2e Testing Utils
 */

const startTestServer = async server => {
  const httpServer = await server.listen({ port: 0 });

  const link = new HttpLink({
    uri: `http://localhost:${httpServer.port}`,
    fetch
  });

  const executeOperation = ({ query, variables = {} }) =>
    execute(link, { query, variables });

  return {
    link,
    stop: () => httpServer.server.close(),
    graphql: executeOperation
  };
};

module.exports.startTestServer = startTestServer;
