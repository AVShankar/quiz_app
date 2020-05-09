import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./Containers/Login/Login";
import Dashboard from "./Containers/Dashboard/Dashboard";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { userLoggedIn: false, user: "" };
  }

  updateUserData = (data) => {
    this.setState({
      userLoggedIn: true,
      user: data,
    });
  };

  handleLogout = () => {
    this.setState({
      userLoggedIn: false,
      user: "",
    });
  };

  render() {
    const { userLoggedIn, user } = this.state;
    return (
      <div className="container-fluid">
        {userLoggedIn ? (
          <Dashboard user={user} handleLogout={this.handleLogout} />
        ) : (
          <Login updateUserData={this.updateUserData} />
        )}
      </div>
    );
  }
}

export default App;
