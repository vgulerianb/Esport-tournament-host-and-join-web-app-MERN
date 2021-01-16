const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const path = require("path");
const versionRouter = require("./versions/v1/version.router");
const cors = require("cors");

const APP_URL = path.resolve(__dirname, "../client/build");
const APP_URL_HOME = path.resolve(__dirname, "../client/build/index.html");
let dir = __dirname.replace("/server","/client/");
// compress all responses
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.text());
app.use(cors());
app.use("/api/", versionRouter);
app.use(express.static(APP_URL));
app.enable('trust proxy');


app.get("*", async (req, res) => {
    res.sendFile(APP_URL_HOME);
});
//all routes

app.listen(PORT, () => {
    console.log("Login service is listening at PORT ", PORT);
});
