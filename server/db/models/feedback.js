const Sequelize = require("sequelize");
const db = require("../db");

const Feedback = db.define("feedback", {
  feedbackUserId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  feedback: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  complete: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
});

module.exports = Feedback;
