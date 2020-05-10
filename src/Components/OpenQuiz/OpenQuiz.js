import React from "react";
import $ from "jquery";

class OpenQuiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = { quizData: [], category: "", level: "" };
  }

  componentDidMount() {
    let id;
    if (localStorage.getItem("quizID") !== null) {
      id = localStorage.getItem("quizID");
    } else {
      id = this.props.quizID;
    }

    $.ajax({
      url: "http://127.0.0.1:5000/findQuiz",
      method: "POST",
      data: { id: id },
    }).then((res) => {
      this.setState({
        quizData: res.quizData,
        category: res.category,
        level: res.difficulty,
      });
    });
  }

  render() {
    const { quizData, category, level } = this.state;
    return (
      <div>
        <div className="d-flex justify-content-between">
          <div>
            <h5>{category}</h5>
          </div>
          <div>
            <h6 className="text-uppercase">
              level: <span>{level}</span>
            </h6>
          </div>
        </div>
        <div>
          {quizData !== []
            ? quizData.map((e) => {
                e.incorrect_answers.push(e.correct_answer);
                return (
                  <div className="p-2">
                    <div className="row">
                      <h5>{e.question}</h5>
                    </div>
                    <div className="row">
                      <p>Options:</p>
                      {e.incorrect_answers.map((opt) => {
                        return (
                          <div key={opt} className="col">
                            <input
                              type="radio"
                              value={opt}
                              id={opt}
                              name="Options"
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })
            : null}
        </div>
        <div className="d-flex justify-content-between p-5">
          <input
            type="button"
            value="Exit"
            className="btn btn-danger"
            onClick={this.props.exitQuiz}
          />
          <input type="button" value="Submit" className="btn btn-success" />
        </div>
      </div>
    );
  }
}

export default OpenQuiz;
