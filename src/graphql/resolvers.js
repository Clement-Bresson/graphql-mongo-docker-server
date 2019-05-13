module.exports = {
  Query: {
    posts: (_, __, { dataSources }) => dataSources.postAPI.getAllPosts(),
    post: (_, { id }, { dataSources }) =>
      dataSources.postAPI.getPostById({ id })
  },
  Mutation: {
    createPost: async (_, { title, text }, { dataSources }) => {
      const post = await dataSources.postAPI.createPost({ title, text });
      return {
        success: true,
        message: 'Post created',
        post
      };
    },
    updatePost: async (_, { id, title, text }, { dataSources }) => {
      const post = await dataSources.postAPI.updatePost({ id, title, text });
      return {
        success: true,
        message: 'Post updated',
        post
      };
    },
    deletePost: async (_, { id }, { dataSources }) => {
      await dataSources.postAPI.deletePost({ id });
      return {
        success: true,
        message: 'Post deleted'
      };
    }
  }
};
