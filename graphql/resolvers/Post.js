module.exports = {
  Query: {
    post: async (_, { _id }, { dataSources }) => {
      return await dataSources.postAPI.findById(_id);
    },
    posts: async (_, __, { dataSources }) => {
      return await dataSources.postAPI.findAll();
    }
  },
  Mutation: {
    createPost: async (_, { post }, { dataSources }) => {
      return await dataSources.postAPI.create(post);
    },
    updatePost: async (_, { _id, post }, { dataSources }) => {
      return await dataSources.postAPI.update({ _id, post });
    },
    deletePost: async (_, { _id }, { dataSources }) => {
      return await dataSources.postAPI.delete(_id);
    }
  },
  Subscription: {
    post: {
      subscribe: () => {
        //return pubsub.asyncIterator(channel)
      }
    }
  },
  Post: {
    author: async ({ author }, _, { dataSources }) => {
      return await dataSources.userAPI.findById(author);
    },
    comments: async ({ author }, _, { dataSources }) => {
      return await dataSources.commentAPI.findByAuthor(author);
    }
  }
};
