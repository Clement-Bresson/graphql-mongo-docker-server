const { DataSource } = require('apollo-datasource');

class PostAPI extends DataSource {
  constructor({ models }) {
    super();
    this.models = models;
  }

  async findAll() {
    const res = await this.models.Post.find({})
      .populate()
      .exec();
    return res.map(u => {
      console.log(u); //eslint-disable-line
      return {
        _id: u._id.toString(),
        title: u.title,
        body: u.body,
        published: u.published,
        author: u.author,
        comments: u.comments
      };
    });
  }

  async findById(_id) {
    return await this.models.Post.findOne({ _id }).exec();
  }

  async findByAuthor(author) {
    return await this.models.Post.find({ author }).exec();
  }

  async create(post) {
    const newPost = await new this.models.Post({
      title: post.title,
      body: post.body,
      published: post.published,
      author: post.author
    });
    const createdPost = await newPost.save();
    const creator = await this.models.User.findById(post.author);
    if (!creator) {
      throw new Error('User not found.');
    }
    creator.posts.push(newPost);
    await creator.save();
    return createdPost;
  }

  async update({ _id, post }) {
    return await this.models.Post.findByIdAndUpdate(
      _id,
      { $set: { ...post } },
      { new: true }
    ).exec();
  }

  async delete(_id) {
    const post = await this.models.Post.findById(_id);
    const creator = await this.models.User.findById(post.author);
    if (!creator) {
      throw new Error('user not found.');
    }
    const index = creator.posts.indexOf(_id);
    if (index > -1) {
      creator.posts.splice(index, 1);
    }
    await creator.save();
    return await this.models.Post.findByIdAndDelete(_id).exec();
  }
}

module.exports = PostAPI;
