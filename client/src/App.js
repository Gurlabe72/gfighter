import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

const UsersQuery = gql`
  {
    users {
      id
      name
      bio
      style
      image_url
      strength
      complete
    }
  }
`;

class App extends Component {
  render() {
    const {
      data: { loading, users }
    } = this.props;
    if (loading) {
      return null;
    } else
      return (
        <div>
          {" "}
          {users.map(user => (
            <div key={user.id}>
              {" "}
              {user.name} {user.bio} {user.style} {user.image_url}{" "}
              {user.strength}{" "}
            </div>
          ))}{" "}
        </div>
      );
  }
}

export default graphql(UsersQuery)(App);
