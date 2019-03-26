import React, { Component } from "react";
import { Menu } from "semantic-ui-react";
class Navbar extends Component {
  render() {
    return (
      <Menu inverted>
        <Menu.Item name="home" as="a" href="/" />
        <Menu.Item name="forms" as="a" href="/" />
        <Menu.Item name="friends" />
      </Menu>
    );
  }
}
export default Navbar;
