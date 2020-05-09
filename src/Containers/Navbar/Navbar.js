import React from "react";

class Navbar extends React.Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-dark bg-dark text-white">
            <h4>Quiz App</h4>
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
