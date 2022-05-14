const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const configureDB = require("./config/db");
const cors = require("cors");
const morgan = require("morgan");
app.use(cors());
app.use(morgan("dev"));
// connect To MONGODB
configureDB();

// define routes and API
app.use(express.json({ extended: false }));
app.use("/api/users", require("./routes/userApi"));
app.use("/api/products", require("./routes/productsApi"));
app.use("/api/auth", require("./routes/authApi"));
app.use("/api/profile", require("./routes/profileApi"));

app.get("/", (req, res) => {
  res.send("My App is up");
});

app.listen(PORT, () => {
  console.log(`server is listining at PORT ${PORT}`);
});
