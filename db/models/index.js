'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

const ListPrices = require("./listprices");
const Users = require("./users");
const Cards = require("./cards");
const PostCards = require("./postcards");
const RefreshTokens = require("./refreshtokens");

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

db.ListPrices = ListPrices(sequelize, Sequelize);
db.Users = Users(sequelize, Sequelize);
db.Cards = Cards(sequelize, Sequelize);
db.PostCards = PostCards(sequelize, Sequelize);
db.RefreshTokens = RefreshTokens(sequelize, Sequelize);

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
