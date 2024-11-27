const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const objectsRoutes = require("./routes/object");
const propertiesRoutes = require("./routes/object_properties");
const imagesRoutes = require("./routes/object_image");
const userRoutes = require("./routes/user");

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/objects", objectsRoutes);
app.use("/api/properties", propertiesRoutes);
app.use("/api/image", imagesRoutes);
app.use("/api/users", userRoutes);

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});