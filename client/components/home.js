import React from "react";
import { connect } from "react-redux";

/**
 * COMPONENT
 */
export const Home = props => {
  let { users } = props;

  let usersRows = users.map((user, idx) => {
    let role = "";
    if (user.role == 1) role = "Super Admin";
    if (user.role == 2) role = "Manager";
    if (user.role == 3) role = "Employee";

    return (
      <tr key={user.id}>
        <th>{idx + 1}</th>
        <th>{role}</th>
        <th>{user.email}</th>
        <th>123</th>
      </tr>
    );
  });

  return (
    <div className="container">
      <h4>Credentials</h4>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">type</th>
            <th scope="col">email</th>
            <th scope="col">password</th>
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
    users: state.users
  };
};

export default connect(mapState)(Home);
