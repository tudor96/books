module.exports = function bookModel(mongoose, modelName) {
  const schema = new mongoose.Schema({
    titleRef: {
      type: String,
      lowercase: true,
      index: true,
    },
    name: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
  });

  mongoose.model(modelName, schema);
};
