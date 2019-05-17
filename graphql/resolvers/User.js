module.exports = {
  Query: {
    user: async (_, { _id }, { dataSources }) => {
      return await dataSources.userAPI.findById(_id);
    },
    users: async (_, __, { dataSources }) => {
      return await dataSources.userAPI.findAll();
    }
  },
  Mutation: {
    createUser: async (_, { user }, { dataSources }) => {
      return await dataSources.userAPI.create(user);
    },
    updateUser: async (_, { _id, user }, { dataSources }) => {
      return await dataSources.userAPI.update({ _id, user });
    },
    deleteUser: async (_, { _id }, { dataSources }) => {
      return await dataSources.userAPI.delete(_id);
    }
  },
  User: {
    posts: async ({ _id }, _, { dataSources }) => {
      return await dataSources.postAPI.findByAuthor(_id);
    },
    comments: async ({ _id }, _, { dataSources }) => {
      return await dataSources.postAPI.findByAuthor(_id);
    }
  }
};
