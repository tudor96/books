const mongoose = require("mongoose");

const user = {
  path: "/api/checkConnection",
  method: "get",
  config: {
    description: "User",
    tags: ["api"],

    handler: async (request, h) => {
      if (mongoose.connection.readyState === 1) {
        return h.response("connected").code(200);
      } else {
        return h.response("bad connection").code(500);
      }
    },
  },
};

module.exports = [user];
