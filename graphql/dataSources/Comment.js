const { DataSource } = require('apollo-datasource');

class CommentAPI extends DataSource {
  constructor({ models }) {
    super();
    this.models = models;
  }

  async findAll() {
    const res = await this.models.Comment.find({})
      .populate()
      .exec();
    return res.map(u => ({
      _id: u._id.toString(),
      text: u.text,
      author: u.author,
      post: u.post
    }));
  }

  async findById(_id) {
    return await this.models.Comment.findOne({ _id }).exec();
  }

  async findByAuthor(author) {
    return await this.models.Comment.find({ author }).exec();
  }

  async create(comment) {
    const newComment = await new this.models.Comment({
      text: comment.text,
      author: comment.author,
      post: comment.post
    });

    return await newComment.save();
  }

  async update({ _id, comment }) {
    return await this.models.Comment.findByIdAndUpdate(
      _id,
      { $set: { ...comment } },
      { new: true }
    ).exec();
  }

  async delete(_id) {
    return await this.models.Comment.findByIdAndDelete(_id).exec();
  }
}

module.exports = CommentAPI;
