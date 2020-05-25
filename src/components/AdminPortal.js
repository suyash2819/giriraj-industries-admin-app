import React, { Component } from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import fire from "../config/FireBase";

class AdminPortal extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }
  logout() {
    fire.auth().signOut();
  }
  render() {
    return (
      <>
        <button onClick={this.logout}>LogOut</button>
      </>
    );
  }
}
export default AdminPortal;
