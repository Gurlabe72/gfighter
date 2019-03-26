import React, { Component } from "react";

import "./App.css";

import { Container } from "semantic-ui-react";
import Header from "./component/Header";
import LocationForm from "./component/LocationForm";
import Navbar from "./component/Navbar";
import gql from "graphql-tag";
import { graphql, compose } from "react-apollo";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

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
const UpdateMutation = gql`
  mutation($id: ID!, $complete: Boolean!) {
    updateUser(id: $id, complete: $complete)
  }
`;

const RemoveMutation = gql`
  mutation($id: ID) {
    removeUser(id: $id)
  }
`;
class App extends Component {
  updateUser = async user => {
    //update User
    await this.props.updateUser({
      variables: {
        id: user.id,
        complete: !user.complete
      },
      update: store => {
        // Read the data from our cache for this query.
        const data = store.readQuery({ query: UsersQuery });
        // Add our comment from the mutation to the end.
        data.users = data.users.map(x =>
          x.id === user.id
            ? {
                ...user,
                complete: !user.complete
              }
            : x
        );
        // Write our data back to the cache.
        store.writeQuery({
          query: UsersQuery,
          data
        });
      }
    });
  };

  removeUser = async user => {
    await this.props.removeUser({
      variables: {
        id: user.id
      },
      update: store => {
        // Read the data from our cache for this query.
        const data = store.readQuery({ query: UsersQuery });
        // Add our comment from the mutation to the end.
        data.users = data.users.filter(x => x.id !== user.id);
        // Write our data back to the cache.
        store.writeQuery({ query: UsersQuery, data });
      }
    });
  };
  render() {
    const {
      data: { loading, users }
    } = this.props;
    if (loading) {
      return null;
    } else
      return (
        <Container>
          <Header />
          <Navbar />
          <LocationForm />
          <div style={{ display: "flex" }}>
            <div style={{ margin: "auto", width: 400 }}>
              <Paper elavation={1}>
                ))}{" "}
                <List>
                  {users.map(user => (
                    <ListItem
                      key={user.id}
                      role={undefined}
                      dense
                      button
                      onClick={() => this.updateUser(user)}
                    >
                      <Checkbox
                        checked={user.complete}
                        tabIndex={-1}
                        disableRipple
                      />
                      <ListItemText primary={user.name} />
                      <ListItemSecondaryAction>
                        <IconButton onClick={() => this.removeUser(user)}>
                          <CloseIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
                ); } }
              </Paper>
            </div>
          </div>
          ); } }
        </Container>
      );
  }
}

export default compose(
  graphql(RemoveMutation, { name: "removerUser" }),
  graphql(UpdateMutation, { name: "updateUser" }),
  graphql(UsersQuery)
)(App);
