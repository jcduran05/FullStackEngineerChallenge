import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { submitReview } from "../store";

/**
 * COMPONENT
 */
const PerformanceReview = props => {
  const { name, user, users, reviews, handleSubmit } = props;

  // Professionalism, Teamwork, Performance radio form fields
  const reviewMetrics = ["professionalism", "teamwork", "performance"];
  const radioOptions = [1, 2, 3, 4, 5];
  let radioFields = [];

  // Select who review will be for
  const reviewComparer = otherArray => {
    return function(current) {
      return (
        otherArray.filter(function(other) {
          return other.userId == current.id;
        }).length == 0
      );
    };
  };
  let filteredUserSelection = users.filter(reviewComparer(reviews));

  let usersSelectOptions = filteredUserSelection.map(user => {
    if (user.role === 3) {
      return (
        <option key={user.id} value={user.id}>
          {user.email}
        </option>
      );
    }
  });

  // Performance metrics filled out by manager
  reviewMetrics.forEach(metric => {
    let temp = radioOptions.map(option => {
      return (
        <div
          className="form-check form-check-inline"
          key={`${metric}${option}`}
        >
          <input
            className="form-check-input"
            type="radio"
            name={metric}
            id={`${metric}${option}`}
            value={option}
          />
          <label className="form-check-label" htmlFor={`${metric}${option}`}>
            {option}
          </label>
        </div>
      );
    });

    radioFields.push(temp);
  });

  // Checkbox for employees that should provide feedback
  let feedbackUserCheckboxes = users.map(user => {
    if (user.role === 3) {
      return (
        <div
          className="form-check form-check-inline"
          key={`checkbox${user.id}`}
        >
          <input
            className="form-check-input"
            type="checkbox"
            name="feedback"
            id={`checkbox${user.id}`}
            value={user.id}
          />
          <label className="form-check-label" htmlFor={`checkbox${user.id}`}>
            {user.email}
          </label>
        </div>
      );
    }
  });

  return (
    <div className="container">
      <form onSubmit={handleSubmit} name={name}>
        <div className="form-field-divider">
          <label htmlFor="selectEmployee">Select Employee</label>
          <div>
            <select
              className="form-control"
              id="selectEmployee"
              name="selectEmployee"
            >
              {usersSelectOptions}
            </select>
          </div>
        </div>

        <div className="form-field-divider">
          <div className="form-label">Professionalism</div>
          {radioFields[0]}
        </div>

        <div className="form-field-divider">
          <div className="form-label">Teamwork</div>
          {radioFields[1]}
        </div>

        <div className="form-field-divider">
          <div className="form-label">Performance</div>
          {radioFields[2]}
        </div>

        <div className="form-field-divider">
          <div className="form-label">
            Request feedback from the following employees:
          </div>
          {feedbackUserCheckboxes}
        </div>

        <input
          type="hidden"
          id="reviewerId"
          name="reviewerId"
          value={user.id}
        />
        <div className="left">
          <button type="submit" className="btn btn-outline-dark btn-square">
            Submit
          </button>
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
    name: "review.add",
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

      let checkedIds = [];
      evt.target.feedback.forEach(checkbox => {
        let tempCheckbox = parseInt(checkbox.value);
        let prId = parseInt(evt.target.selectEmployee.value);

        if (checkbox.checked & (tempCheckbox != prId))
          checkedIds.push(tempCheckbox);
      });

      let userId = parseInt(evt.target.selectEmployee.value);
      let reviewerId = parseInt(evt.target.reviewerId.value);
      let professionalism = parseInt(evt.target.professionalism.value);
      let teamwork = parseInt(evt.target.teamwork.value);
      let performance = parseInt(evt.target.performance.value);
      let feedback = checkedIds;

      let submitObj = {
        userId: parseInt(evt.target.selectEmployee.value),
        reviewerId: parseInt(evt.target.reviewerId.value),
        professionalism: parseInt(evt.target.professionalism.value),
        teamwork: parseInt(evt.target.teamwork.value),
        performance: parseInt(evt.target.performance.value),
        feedback: checkedIds
      };

      dispatch(submitReview(submitObj, formName));
    }
  };
};

export default connect(mapState, mapDispatch)(PerformanceReview);

/**
 * PROP TYPES
 */
PerformanceReview.propTypes = {};
