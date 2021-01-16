const mongoose = require("mongoose");
const keys = require("./keys");
const env = process.env.NODE_ENV
const conf = keys.mongodb[env];

let connectionString;

mongoose.set("useNewUrlParser", true);
mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useUnifiedTopology", true);

switch (env) {
    case "local":
        connectionString = `mongodb://${conf.host}:${conf.port}/${conf.database}`;
        break;
    case "dev":
        connectionString = `mongodb://${conf.username}:${encodeURIComponent(conf.password)}@${conf.host}:${conf.port},${conf.host_1}:${conf.port_1},${conf.host_2}:${conf.port_2}/${conf.database}?ssl=true&replicaSet=${conf.replicaSet}&readPreference=secondaryPreferred&authSource=admin`;
        break;
}

mongoose.connect(connectionString).catch(e => {
    console.error(e);
});

const connection = mongoose.connection;
connection.on("error", e => {
    console.error(e);
});
connection.once("open", () => {
    console.log("MongoDB database connection established successfully");
});

module.exports = mongoose;