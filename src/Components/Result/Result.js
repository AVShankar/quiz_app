import React from "react";

class Result extends React.Component {
  render() {
    return (
      <div className="p-5">
        <h3>Your quiz score is: {this.props.totCorrAns}</h3>
        <div className="d-flex justify-content-end">
            <input type="button" className="btn btn-primary"  value="Exit" onClick={this.props.exitQuiz} />
        </div>
      </div>
    );
  }
}

export default Result;
