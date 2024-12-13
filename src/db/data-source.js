require("ts-node/register");
require("dotenv").config();

const { AppDataSource } = require("./data-source.js");
module.exports = AppDataSource; // Re-export the DataSource instance