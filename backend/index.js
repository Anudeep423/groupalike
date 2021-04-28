const express = require("express");
// require('dotenv').config()
const userRoutes = require("./Views/user")
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors")

const PORT = 8080
app.use(bodyParser());
app.get("/", (req, res) => { res.json({ Message: "You only here yet ?" }) })

mongoose.connect("mongodb+srv://Anudeep:12345@cluster0.w9478.mongodb.net/groupalike?retryWrites=true&w=majority", { useUnifiedTopology: true }).then(res => {
    console.log("Seccesfully connected ")
});

app.use("/api", userRoutes)

app.use(cors());



app.listen(PORT, () => { console.log(`Port started running on ${PORT}`) })