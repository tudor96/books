const mongoose = require("mongoose");

const user = {
  path: "/api/checkConnection",
  method: "get",
  config: {
    description: "User",
    tags: ["api"],

    handler: async (request, h) => {
      try {
        return h.response(docs).code(200);
      } catch (error) {
        return h.response(err).code(400);
      }
    },
  },
};

module.exports = [user];
