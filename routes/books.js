const mongoose = require("mongoose");
const Book = mongoose.model("book");
const createBooksObject = () => {
  const obj = [];
  for (let i = 0; i < 100; i++) {
    obj.push({
      name: "BookName" + i,
      description: "BookDescription " + i,
      titleRef: "bookname_" + i,
    });
  }
  return obj;
};

const books = {
  path: "/api/books",
  method: "POST",
  config: {
    description: "Books",
    tags: ["api", "login", "admin"],
    cors: {
      origin: ["*"],
      additionalHeaders: ["cache-control", "x-requested-with"],
    },
    handler: async (request, h) => {
      try {
        const docs = await Book.insertMany(createBooksObject());
        return h.response(docs).code(200);
      } catch (error) {
        return h.response(err).code(400);
      }
    },
  },
};

const booksAgreggate = {
  path: "/api/booksAgreggate",
  method: "GET",
  config: {
    description: "Books",
    tags: ["api", "login", "admin"],
    cors: {
      origin: ["*"],
      additionalHeaders: ["cache-control", "x-requested-with"],
    },
    handler: async (request, h) => {
      try {
        const started = new Date().getTime();
        const docs = await Book.aggregate([{ $sort: { name: 1 } }]);
        return h
          .response({ time: new Date().getTime() - started, data: docs })
          .code(200);
      } catch (error) {
        return h.response(err).code(400);
      }
    },
  },
};

module.exports = [books, booksAgreggate];
