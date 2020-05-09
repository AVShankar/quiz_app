import React from "react";

class Navbar extends React.Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-light bg-light">
          Quiz App
            <input
              className="form-inline btn btn-outline-danger my-2 my-sm-0"
              type="submit"
              value="Logout"
              onClick={this.props.handleLogout}
            />
        </nav>
      </div>
    );
  }
}

export default Navbar;
