const { DataSource } = require('apollo-datasource');

class PostAPI extends DataSource {
  constructor({ store }) {
    super();
    this.store = store;
  }

  async getAllPosts() {
    const query = this.store.Post.find({});
    const posts = await query.exec();
    return posts || [];
  }

  async getPostById({ id } = {}) {
    const query = this.store.Post.findById(id);
    const post = await query.exec();
    return post;
  }

  async createPost({ title, text }) {
    const post = new this.store.Post({ title, text });
    const createdPost = await post.save();
    return createdPost;
  }

  async updatePost({ id, title, text }) {
    const query = this.store.Post.findById(id);
    const post = await query.exec();
    const updatedPost = { ...post._doc, title, text };
    await this.store.Post.updateOne({ _id: id }, updatedPost);
    return { id, ...updatedPost };
  }

  async deletePost({ id }) {
    await this.store.Post.deleteOne({ _id: id });
  }
}

module.exports = PostAPI;
