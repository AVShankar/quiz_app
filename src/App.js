import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./Containers/Login/Login";
import Dashboard from "./Containers/Dashboard/Dashboard";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { userLoggedIn: false };
  }

  componentDidMount() {
    if (localStorage.getItem("name") !== null) {
      this.setState({
        userLoggedIn: true,
      });
    }
  }

  updateUserData = (data) => {
    localStorage.setItem("name", data.user_name);
    localStorage.setItem("email", data.email);
    localStorage.setItem("school", data.school_name);
    localStorage.setItem("admin", data.admin);
    this.setState({
      userLoggedIn: true,
    });
  };

  handleLogout = () => {
    localStorage.clear();
    this.setState({
      userLoggedIn: false,
    });
  };

  render() {
    const { userLoggedIn } = this.state;
    return (
      <div className="container-fluid">
        {userLoggedIn ? (
          <Dashboard handleLogout={this.handleLogout} />
        ) : (
          <div className="bg-dark">
          <Login updateUserData={this.updateUserData} />
          </div>
        )}
      </div>
    );
  }
}

export default App;
