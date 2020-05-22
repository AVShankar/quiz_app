import React from "react";
import "./OpenQuiz.css";
import QuestionComp from "../QuestionComp/QuestionComp";
import Result from "../Result/Result";
import $ from "jquery";

class OpenQuiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quizQuestId: "",
      quizData: [],
      currQuest: 0,
      showResult: false,
      totCorrAns: 0,
    };
  }

  componentDidMount() {
    let id = null;
    if (this.props.quizID !== "") {
      id = this.props.quizID;
    } else {
      id = localStorage.getItem("quizID");
    }

    this.setState({
      quizQuestId: id,
    });

    $.ajax({
      url: "http://127.0.0.1:5000/findQuiz",
      async: false,
      method: "POST",
      data: { id: id },
    }).then((res) => {
      this.setState({
        quizData: res.quizData,
      });
    });
  }

  submitQuiz = () => {
    this.setState({
      showResult: true,
    });
  };

  exitQuiz = () => {
    this.setState({
      showResult: false,
    });
    this.props.exitQuiz();
  };

  changeQuestion = (isCorrect) => {
    const { currQuest, totCorrAns } = this.state;
    if (isCorrect) {
      this.setState({
        totCorrAns: totCorrAns + 1,
        currQuest: currQuest + 1,
      });
    } else {
      this.setState({
        currQuest: currQuest + 1,
      });
    }
  };

  render() {
    const { quizData, currQuest, showResult, totCorrAns } = this.state;
    if (showResult) {
      return <Result totCorrAns={totCorrAns} exitQuiz={this.exitQuiz} />;
    }
    return (
      <div>
        {quizData.length !== 0 ? (
          <QuestionComp
            changeQuestion={this.changeQuestion}
            submitQuiz={this.submitQuiz}
            currQuest={quizData[currQuest]}
            questionNumber={currQuest + 1}
          />
        ) : null}
      </div>
    );
  }
}

export default OpenQuiz;
