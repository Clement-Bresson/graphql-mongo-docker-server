module.exports = function createModels(mongoose) {
  const postSchema = new mongoose.Schema({
    title: String,
    text: String
  });

  return {
    Post: mongoose.model('Post', postSchema)
  };
};
