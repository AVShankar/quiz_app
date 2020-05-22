import React from "react";

class QuestionComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      correctAns: "",
      option: [],
      selectedCorrAns: false,
      selectedIncorrAns: false,
      disableOptions: false,
    };
  }

  componentDidMount() {
    const { currQuest } = this.props;
    let options = currQuest.incorrect_answers;
    options.push(currQuest.correct_answer);
    this.setState({
      correctAns: currQuest.correct_answer,
      option: options,
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.currQuest.question !== prevProps.currQuest.question) {
      const { currQuest } = this.props;
      let options = currQuest.incorrect_answers;
      options.push(currQuest.correct_answer);
      this.setState({
        correctAns: currQuest.correct_answer,
        option: options,
      });
    }
  }

  recordAnswer = (id) => {
    const { correctAns } = this.state;
    id === correctAns
      ? this.setState({
          selectedCorrAns: true,
          disableOptions: true,
        })
      : this.setState({
          selectedIncorrAns: true,
          disableOptions: true,
        });
  };

  nextQuest = () => {
    this.setState({
      selectedCorrAns: false,
      selectedIncorrAns: false,
      disableOptions: false,
      option: [],
      correctAns: "",
    });
    this.props.changeQuestion(this.state.selectedCorrAns);
  };

  render() {
    const { currQuest, questionNumber } = this.props;
    const {
      option,
      correctAns,
      selectedCorrAns,
      selectedIncorrAns,
      disableOptions,
    } = this.state;
    return (
      <div>
        {currQuest !== undefined ? (
          <div>
            <div className="p-5 d-flex justify-content-between">
              <h5>TOPIC: {currQuest.category}</h5>
              <h6 className="text-uppercase">
                difficulty: {currQuest.difficulty}
              </h6>
            </div>
            <div className="p-5 table-bordered">
              <div className="p-3">
                <h5>
                  {questionNumber}) {currQuest.question}
                </h5>
                <p>Options:</p>
                <div>
                  {option.map((e) => {
                    return (
                      <div key={e}>
                        <input
                          type="radio"
                          key={e}
                          id={e}
                          disabled={disableOptions}
                          onChange={this.recordAnswer.bind(this.id, e)}
                        />
                        <span className="pl-1">{e}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
              {selectedCorrAns ? (
                <div>
                  <p className="text-success">You're Correct: {correctAns}</p>
                </div>
              ) : null}
              <div>
                {selectedIncorrAns ? (
                  <div>
                    <p className="text-danger">
                      Correct Answer is: {correctAns}
                    </p>
                  </div>
                ) : null}
              </div>
              <div className="d-flex justify-content-end">
                {questionNumber === 10 ? (
                  <input
                    type="button"
                    className="btn btn-success"
                    value="Submit"
                    onClick={this.props.submitQuiz}
                  />
                ) : (
                  <input
                    type="button"
                    className="btn btn-primary"
                    value="Next"
                    onClick={this.nextQuest}
                    // disabled={!disableOptions}
                  />
                )}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default QuestionComp;
