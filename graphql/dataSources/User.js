const { DataSource } = require('apollo-datasource');

class UserAPI extends DataSource {
  constructor({ models }) {
    super();
    this.models = models;
  }

  async findAll() {
    const res = await this.models.User.find({})
      .populate()
      .exec();
    return res.map(u => ({
      _id: u._id.toString(),
      name: u.name,
      email: u.email,
      age: u.age,
      posts: u.posts,
      comments: u.comments
    }));
  }

  async findById(_id) {
    return await this.models.User.findOne({ _id }).exec();
  }

  async create(user) {
    const newUser = await new this.models.User({
      name: user.name,
      email: user.email,
      age: user.age
    });

    return await newUser.save();
  }

  async update({ _id, user }) {
    return await this.models.User.findByIdAndUpdate(
      _id,
      { $set: { ...user } },
      { new: true }
    ).exec();
  }

  async delete(_id) {
    return await this.models.User.findByIdAndDelete(_id).exec();
  }
}

module.exports = UserAPI;
