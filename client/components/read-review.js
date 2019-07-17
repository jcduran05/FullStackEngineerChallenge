import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

/**
 * COMPONENT
 */
const ReadReview = props => {
  const { user, reviews, feedback } = props;

  // Grab review for user if available
  let userReview = reviews.filter(review => {
    return review.userId === user.id;
  });
  userReview = userReview[0];
  if (!userReview) {
    return (
      <div className="container">
        A performance review has not been submitted. Please contact your
        manager.
      </div>
    );
  }

  // Grab feedback if any has been submitted
  let feedbackForUser = feedback.filter(f => {
    return f.reviewId === userReview.id;
  });
  let feedbackHtml = feedbackForUser.map(f => {
    return (
      <div className="divider" key={f.id}>
        {f.feedback}
      </div>
    );
  });

  if (!userReview) {
    return (
      <div className="container">
        A performance review has not been submitted. Please contact your
        manager.
      </div>
    );
  }

  return (
    <div className="container">
      <form>
        <div className="form-field-divider">
          <div>Professionalism: {userReview.professionalism}</div>
          <div>Teamwork: {userReview.teamwork}</div>
          <div>Performance: {userReview.performance}</div>
        </div>
        <div className="form-field-divider">
          <div>Feedback from other employees</div>
          {feedbackHtml}
        </div>
      </form>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    user: state.user,
    reviews: state.reviews,
    feedback: state.feedback
  };
};

export default connect(mapState)(ReadReview);

/**
 * PROP TYPES
 */
ReadReview.propTypes = {};
