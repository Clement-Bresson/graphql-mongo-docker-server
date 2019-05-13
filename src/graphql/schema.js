const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    posts: [Post]!
    post(id: ID!): Post
  }

  type Mutation {
    createPost(title: String!, text: String!): PostCreateOrUpdateResponse!
    updatePost(
      id: ID!
      title: String
      text: String
    ): PostCreateOrUpdateResponse!
    deletePost(id: ID!): PostDeleteResponse!
  }

  type PostCreateOrUpdateResponse {
    success: Boolean!
    message: String!
    post: Post!
  }

  type PostDeleteResponse {
    success: Boolean!
    message: String!
  }

  type Post {
    id: ID!
    title: String!
    text: String!
  }
`;

module.exports = typeDefs;
