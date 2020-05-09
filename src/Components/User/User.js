import React from "react";

class User extends React.Component {
  render() {
    return (
      <div className="container p-4">
        <div>
          <h4>
            Hello, <span>{localStorage.getItem("name")}</span>
          </h4>
          <p className="text-muted">Email: {localStorage.getItem("email")}</p>
          <p className="text-muted">School: {localStorage.getItem("school")}</p>
        </div>
        <h5>Active Quiz: </h5>
        <div className="d-flex">
          <div className="card border-dark mb-3 text-center">
            <div className="card-body text-dark">
              <h5 className="card-title">Quiz topic</h5>
              <p className="card-text">
                  Quiz based on topic_name
              </p>
              <input type="button" value="Start Quiz" className="btn btn-primary" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default User;
