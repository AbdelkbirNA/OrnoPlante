const dotenv = require("dotenv");
require("dotenv").config();

if (process.env.NODE_ENV === "production") {
  dotenv.config({ path: ".env.production" });
} else {
  dotenv.config({ path: ".env.local" });
}

const app = require("./app");
const { connectDatabase } = require("./config/database");
const { initAdminUser } = require("./utils/initAdmin");

const PORT = process.env.PORT || 8080; // important pour Railway

async function startServer() {
  try {
    await connectDatabase();
    await initAdminUser();
    console.log("✅ Database connected and admin user initialized.");
  } catch (err) {
    console.error("⚠️ Database connection failed:", err.message);
  }

  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}

startServer();
