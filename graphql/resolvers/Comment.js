module.exports = {
  Query: {
    comment: async (_, { _id }, { dataSources }) => {
      return await dataSources.commentAPI.findById(_id);
    },
    comments: async (_, __, { dataSources }) => {
      return await dataSources.commentAPI.findAll();
    }
  },
  Mutation: {
    createComment: async (_, { comment }, { dataSources }) => {
      return await dataSources.commentAPI.create(comment);
    },
    updateComment: async (_, { _id, comment }, { dataSources }) => {
      return await dataSources.commentAPI.update({ _id, comment });
    },
    deleteComment: async (_, { _id }, { dataSources }) => {
      return await dataSources.commentAPI.delete(_id);
    }
  },
  Subscription: {
    comment: {
      subscribe: () => {
        //return pubsub.asyncIterator(channel)
      }
    }
  },
  Comment: {
    author: async ({ author }, _, { dataSources }) => {
      return await dataSources.userAPI.findById(author);
    },
    post: async ({ _id }, _, { dataSources }) => {
      return await dataSources.postAPI.findById(_id);
    }
  }
};
