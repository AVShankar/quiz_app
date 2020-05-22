import React from "react";
import $ from 'jquery';

class UserHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activeQuiz: [] };
  }

  componentDidMount() {
    $.ajax({
      url: "http://127.0.0.1:5000/activeQuiz",
      method: "GET",
    })
      .then((res) => {
        this.setState({
          activeQuiz: res,
        });
      })
      .catch((err) => {
        console.log("Unable to retrive data");
        console.log(err);
      });
  }
  render() {
    const { activeQuiz } = this.state;
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
        <div className="row p-2">
        {activeQuiz.length !== 0 ? activeQuiz.map((i) => {
            return (
              <div className="col-4 p-2">
              <div key={i._id} className="card border-dark mb-3 text-center">
                <div className="card-body text-dark">
                  <h5 className="card-title">{i.category}</h5>
                  <p className="card-text text-uppercase">
                    Level: <span>{i.difficulty}</span>
                  </p>
                  <input
                    type="button"
                    value="Start Quiz"
                    className="btn btn-success"
                    onClick={this.props.showQuiz}
                    id={i._id}
                  />
                </div>
              </div>
              </div>
            );
          }) : <h6>No active quiz found</h6>}
        </div>
      </div>
    );
  }
}

export default UserHome;
