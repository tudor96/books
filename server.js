"use strict";
require("dotenv").config();

const Hapi = require("@hapi/hapi");
const routes = require("hapi-auto-routes");
const mongoose = require("mongoose");
const mongoload = require("mongoload");

// Setting up Server ---------------------------- //
// const server = new Hapi.Server();
// server.connection({
//   port: 3000,
//   host: "localhost",
//   routes: {
//     cors: true,
//   },
// });

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// if (process.env.NODE_ENV !== "production") {
//   mongoose.set("debug", true);
// }

const db = mongoose.connection;

mongoload.bind(mongoose).load({
  pattern: `${__dirname}/models/*.js`,
});

db.on("error", () => {
  console.error("Connection to db failed!");
  process.exit(0);
});

db.once("open", function () {
  // we're connected!
  console.info(`MongoDB::Connected at ${process.env.MONGO_URI}`);
  init();
});

// db.on("connected", () => {
//   // On successfull connection, log connection details
//   console.info(`MongoDB::Connected at ${process.env.MONGO_URI}`);
//   init();
//   // start the server
//   // eslint-disable-next-line
//   //   startServer();
// });

db.on("disconnected", (err) => {
  console.error("Connection terminated to db", err);
  process.exit(0);
});

// HELPER FUNCTIONS ----------------------------- //
// function startServer() {

//   server.register(requiredHapiPlugins, (err) => {
//     if (err) {
//       console.error('Error in registering one or more plugins.');

//       process.exit(0);
//     } else {
//       server.auth.strategy('jwt', 'jwt', {
//         key: config.JWTConfig.secret,
//         validateFunc: jwtValidate,
//         verifyOptions: { algorithms: ['HS256'] },
//       });

//       routes.bind(server).register({
//         pattern: `${__dirname}/routes/**/*.js`,
//       });

//       server.start(() => {
//         console.info(`Server started at: ${server.info.uri}`);
//       });
//     }
//   });
// }

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: "localhost",
  });

  routes.bind(server).register({
    pattern: `${__dirname}/routes/**/*.js`,
  });

  //   server.route({
  //     method: "GET",
  //     path: "/",
  //     handler: (request, h) => {
  //       return "Hello World!";
  //     },
  //   });

  await server.start();
  console.log("Server running on %s", server.info.uri);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});
