const Sequelize = require("sequelize");
const db = require("../db");

const ReviewFeedback = db.define("review_feedback", {
  reviewerUserId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  feedbackUserId: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

module.exports = ReviewFeedback;
