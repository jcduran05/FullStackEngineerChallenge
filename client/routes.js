import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Login,
  Signup,
  UserHome,
  Home,
  PerformanceReview,
  ReadReview,
  Feedback
} from "./components";
import { me, fetchUsers, fetchReviews, fetchFeedback } from "./store";

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn, isManager, users, reviews, feedback } = this.props;

    if (
      users == undefined ||
      (!Object.keys(users).length && reviews == undefined) ||
      (!Object.keys(reviews).length && feedback == undefined) ||
      !Object.keys(feedback).length
    ) {
      return (
        <div className="loading">
          <div className="col-md-12">loading...</div>
        </div>
      );
    }

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        {isLoggedIn &&
          isManager && (
            <Switch>
              {/* Routes placed here are only available after logging in */}
              <Route path="/home" component={UserHome} />
              <Route path="/createpr" component={PerformanceReview} />
            </Switch>
          )}
        {isLoggedIn &&
          !isManager && (
            <Switch>
              {/* Routes placed here are only available after logging in */}
              <Route path="/home" component={UserHome} />
              <Route path="/readpr" component={ReadReview} />
              <Route path="/feedback" component={Feedback} />
            </Switch>
          )}
        {/* Displays our Login component as a fallback */}
        <Route component={Home} />
      </Switch>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    users: state.users,
    reviews: state.reviews,
    feedback: state.feedback,
    isLoggedIn: !!state.user.id,
    isManager: state.user.role === 2
  };
};

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me());
      dispatch(fetchUsers());
      dispatch(fetchReviews());
      dispatch(fetchFeedback());
    }
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  isSuperAdmin: PropTypes.bool,
  isManager: PropTypes.bool
};
