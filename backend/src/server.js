require("dotenv").config();
const app = require("./app");
const { connectDatabase } = require("./config/database");
const {initAdminUser} = require("./utils/initAdmin")

const PORT =  8080;

async function startServer() {
  await connectDatabase();
  await initAdminUser();
  app.listen(PORT, () => {
    console.log(`Server ON ✅ `);
  });
}

startServer();
