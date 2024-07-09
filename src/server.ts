/* eslint-disable no-console */
import { Server } from "http";
import app from "./app";
import mongoose from "mongoose"

import config from "./app/config";

const port = process.env.PORT || 5000;

let server: Server

// add event listener for handle unhandleRejection
process.on("unhandledRejection", async () => {
  // closing all connection with server
  server?.closeAllConnections()

  // closeing server
  server.close(() => {
    console.log("Server is closed gracefully");
    // exit process
    process.exit(1)
  })
})

// creat main function for start server and database connection
async function main() {
  // connect database
  await mongoose.connect(config.dbUrl);

  // start server
  server = app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
}

main()


