const Sequelize = require("sequelize");
const db = require("../db");

const Review = db.define("review", {
  reviewerId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  professionalism: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  teamwork: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  performance: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  note: {
    type: Sequelize.TEXT
  }
});

module.exports = Review;
