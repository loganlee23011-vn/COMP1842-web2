require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { connectDatabase } = require("./config/database");

global.Vocab = require("./api/models/vocabModel");
global.User = require("./api/models/userModel");
global.Ticket = require("./api/models/ticketModel");
const User = global.User;
const routes = require("./api/routes/vocabRoutes");
const userRoutes = require("./api/routes/userRoutes");
const supportRoutes = require("./api/routes/supportRoutes");
const ticketRoutes = require("./api/routes/ticketRoutes");

const port = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

routes(app);
userRoutes(app);
supportRoutes(app);
ticketRoutes(app);

app.use((req, res) => {
  res.status(404).send({ url: req.originalUrl + " not found" });
});

async function normaliseLegacyUserRoles() {
  const result = await User.updateMany(
    { role: { $ne: "staff" } },
    { $set: { role: "staff" } }
  );

  if (result.modifiedCount > 0) {
    console.log(`Updated ${result.modifiedCount} legacy user role(s) to staff.`);
  }
}

connectDatabase()
  .then(() => {
    return normaliseLegacyUserRoles();
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Database connection failed", error);
    process.exit(1);
  });
