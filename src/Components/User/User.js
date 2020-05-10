import React from "react";
import UserHome from "../UserHome/UserHome";
import OpenQuiz from "../OpenQuiz/OpenQuiz";

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = { quizID: "" };
  }

  showQuiz = (e) => {
    console.log(e.target.id);
    localStorage.setItem("quizID", e.target.id);
    this.setState({
      quizID: e.target.id,
    });
  };

  exitQuiz = () => {
    localStorage.setItem("quizID", "");
    this.setState({
      quizID: "",
    });
  };

  render() {
    const { quizID } = this.state;
    return (
      <div className="container p-4">
        {localStorage.getItem("quizID") !== "" ? (
          <OpenQuiz exitQuiz={this.exitQuiz} quizID={quizID} />
        ) : (
          <UserHome showQuiz={this.showQuiz} />
        )}
      </div>
    );
  }
}

export default User;
