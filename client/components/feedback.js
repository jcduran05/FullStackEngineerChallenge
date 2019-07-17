import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { submitFeedback } from "../store";

/**
 * COMPONENT
 */
const Feedback = props => {
  const { name, user, users, reviews, feedback, handleSubmit } = props;

  // Select feedback rows that are applicable to current logged in user
  const feedbackComparer = otherArray => {
    return function(current) {
      return (
        !otherArray.filter(function(other) {
          return other.reviewId == current.id;
        }).length == 0
      );
    };
  };
  const reviewComparer = otherArray => {
    return function(current) {
      return (
        !otherArray.filter(function(other) {
          return other.userId === current.id;
        }).length == 0
      );
    };
  };

  // Filtered list to know who feedback is for
  let filteredFeedbacks = feedback.filter(f => {
    return f.feedbackUserId === user.id;
  });
  let filteredReviews = reviews.filter(feedbackComparer(filteredFeedbacks));

  let filteredUsers = users.filter(reviewComparer(filteredReviews));

  let feedbackHtml = filteredFeedbacks.map(f => {
    let tempReview = filteredReviews.filter(r => r.id == f.reviewId);
    let tempUser = filteredUsers.filter(u => u.id == tempReview[0].userId);
    tempUser = tempUser[0];

    return (
      <form onSubmit={handleSubmit} name={`${name}.${f.id}`} key={f.id}>
        <div className="form-field-divider">
          <div className="form-group">
            <label htmlFor="">
              Please leave feedback for: {tempUser.email}
            </label>
            <textarea
              className="form-control"
              id=""
              rows="5"
              name="feedback"
              defaultValue={f.feedback}
            />
            <input
              type="hidden"
              id="feedbackId"
              name="feedbackId"
              value={f.id}
            />
          </div>
        </div>
        <div>
          <button type="submit" className="btn btn-outline-dark btn-square">
            Submit
          </button>
        </div>
      </form>
    );
  });

  return <div className="container">{feedbackHtml}</div>;
};

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    name: "feedback.add",
    user: state.user,
    users: state.users,
    reviews: state.reviews,
    feedback: state.feedback
  };
};

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();

      const formName = evt.target.name;
      const id = evt.target.feedbackId.value;
      const feedback = evt.target.feedback.value;

      dispatch(
        submitFeedback(
          {
            id: id,
            feedback: feedback,
            complete: true
          },
          formName
        )
      );
    }
  };
};

export default connect(mapState, mapDispatch)(Feedback);

/**
 * PROP TYPES
 */
Feedback.propTypes = {};
