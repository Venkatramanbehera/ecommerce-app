const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const configureDB = require('./config/db');

// connect To MONGODB
configureDB();

// define routes and API
app.use(express.json({ extended: false }));
app.use("/api/users", require('./routes/userApi'));
app.use("/api/products", require('./routes/productsApi'));
app.use("/api/auth", require('./routes/authApi'));

app.get('/', (req, res) => {
    res.send("My App is up");
})

app.listen(PORT, () => {
    console.log(`server is listining at PORT ${PORT}`)
})