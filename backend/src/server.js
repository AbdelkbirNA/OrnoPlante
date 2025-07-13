require("dotenv").config();
const app = require("./app");
const { connectDatabase } = require("./config/database");

const PORT =  8080;

async function startServer() {
  await connectDatabase();
  app.listen(PORT, () => {
    console.log(`Server ON ✅ `);
  });
}

startServer();
