import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteUser } from "../store";

/**
 * COMPONENT
 */
export const UserHome = props => {
  const { handleDeleteUser, isManager, name, users } = props;

  // If regular employee, this is all they see
  if (!isManager) {
    return (
      <div className="container">
        <h4>Welcome, {name}</h4>
      </div>
    );
  }

  // Only displays employees. Additonal check could be done for different roles
  let counter = 0;
  let usersRows = users.map(user => {
    if (user.role === 3) {
      counter++;
      return (
        <tr key={user.id}>
          <th>{counter}</th>
          <th>{user.email}</th>
          <th>
            <a
              href="#"
              className="btn btn-outline-danger btn-square"
              onClick={() => handleDeleteUser(user)}
            >
              delete
            </a>
          </th>
        </tr>
      );
    }
    
  });

  return (
    <div className="container">
      <h4>Welcome, {name}</h4>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">email</th>
            <th scope="col">action</th>
          </tr>
        </thead>
        <tbody>{usersRows}</tbody>
      </table>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isManager: state.user.role === 2,
    name: state.user.name,
    users: state.users
  };
};

const mapDispatch = dispatch => {
  return {
    handleDeleteUser(id) {
      dispatch(deleteUser(id));
    }
  };
};

export default connect(mapState, mapDispatch)(UserHome);

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string,
  name: PropTypes.string
};
