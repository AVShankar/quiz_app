import React from "react";
import "./Admin.css";
import $ from "jquery";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = { addQuiz: false, activeQuiz: [] };
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

  addQuizModal = (e) => {
    e.preventDefault();
    this.setState({
      addQuiz: true,
    });
  };

  addNewQuiz = (e) => {
    e.preventDefault();
    let count = this.tot_quest.value;
    let categorySelected = this.category.value;
    let difficultySelected = this.difficulty.value;
    let type = this.type.value;

    $.ajax({
      url: `https://opentdb.com/api.php?amount=${count}&category=${categorySelected}&difficulty=${difficultySelected}&type=${type}`,
      method: "GET",
    })
      .then((res) => {
        this.setState({
          addQuiz: false,
        });
        let result = {
          category: res.results[0].category,
          quizData: res.results,
          difficulty: difficultySelected,
        };

        $.ajax({
          url: "http://127.0.0.1:5000/addQuiz",
          method: "POST",
          data: result,
        })
          .then((res) => {
            console.log("Sucessfully added new quiz data");
            window.location.reload();
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  onCloseModal = () => {
    this.setState({
      addQuiz: false,
    });
  };

  handleDelete = (e) => {
      $.ajax({
          url: "http://127.0.0.1:5000/deleteQuiz",
          method: "DELETE",
          data: { id: e.target.id }
      }).then(res => {
          alert('Successfully removed');
          window.location.reload();
      }).catch(err => {
          console.log('Something went wrong!')
      })
  }

  render() {
    const { addQuiz, activeQuiz } = this.state;
    return (
      <div className="container p-4">
        <div>
          <h4>
            Hello, <span>{localStorage.getItem("name")}</span>
          </h4>
          <p className="text-muted">Email: {localStorage.getItem("email")}</p>
          <p className="text-muted">School: {localStorage.getItem("school")}</p>
        </div>
        <div className="d-flex justify-content-between">
          <h5>Active Quiz: </h5>
          <input
            type="button"
            value="+ Add Quiz"
            className="btn btn-outline-success"
            onClick={this.addQuizModal}
          />
        </div>
        <div className="d-flex justify-content-around p-2">
          {activeQuiz.length !== 0 ? activeQuiz.map((i) => {
            return (
              <div key={i._id} className="card border-dark mb-3 text-center">
                <div className="card-body text-dark">
                  <h5 className="card-title">{i.category}</h5>
                  <p className="card-text text-uppercase">
                    Level: <span>{i.difficulty}</span>
                  </p>
                  <input
                    type="button"
                    value="Delete Quiz"
                    className="btn btn-danger"
                    onClick={this.handleDelete}
                    id={i._id}
                  />
                </div>
              </div>
            );
          }) : <h6>No active quiz found</h6>}
        </div>
        <div>
          <Modal
            open={addQuiz}
            onClose={this.onCloseModal}
            center={true}
            showCloseIcon
          >
            <div className="container p-5">
              <h3 className="text-muted text-center">Add new Quiz</h3>
              <form className="form">
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>
                        <p className="label-txt">Tot questions :</p>
                        <select className="select-input" id="tot_quest" ref={e => this.tot_quest = e}>
                          <option value="10">10</option>
                        </select>
                        <div className="line-box">
                          <div className="line"></div>
                        </div>
                      </label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>
                        <p className="label-txt">Category :</p>
                        <select className="select-input" id="category" ref={e => this.category = e}>
                          <option value="9">General Knowledge</option>
                          <option value="10">Entertainment: Books</option>
                          <option value="11">Entertainment: Film</option>
                          <option value="12">Entertainment: Music</option>
                          <option value="13">
                            Entertainment: Musicals & Theatres
                          </option>
                          <option value="14">Entertainment: Television</option>
                          <option value="15">Entertainment: Video Games</option>
                          <option value="16">Entertainment: Board Games</option>
                          <option value="17">Science & Nature</option>
                          <option value="18">Science: Computers</option>
                          <option value="19">Science: Maths</option>
                          <option value="20">Myth</option>
                          <option value="21">Sports</option>
                          <option value="22">Geography</option>
                          <option value="23">History</option>
                          <option value="24">Politics</option>
                          <option value="25">Art</option>
                          <option value="26">Celebrities</option>
                          <option value="27">Animals</option>
                          <option value="28">Vehicles</option>
                          <option value="29">Entertainment: Comics</option>
                          <option value="30">Science: Gadgets</option>
                          <option value="31">Entertainment: Anime</option>
                          <option value="32">Entertainment: Cartoon</option>
                        </select>
                        <div className="line-box">
                          <div className="line"></div>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>
                        <p className="label-txt">Difficulty :</p>
                        <select className="select-input" id="difficulty" ref={e => this.difficulty = e}>
                          <option value="easy">Easy</option>
                          <option value="medium">Medium</option>
                          <option value="hard">Hard</option>
                        </select>
                        <div className="line-box">
                          <div className="line"></div>
                        </div>
                      </label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>
                        <p className="label-txt">Type :</p>
                        <select className="select-input" id="type" ref={e => this.type =e}>
                          <option value="multiple">Multiple Choice</option>
                        </select>
                        <div className="line-box">
                          <div className="line"></div>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-center">
                  <button
                    type="submit"
                    id="addQuiz"
                    className="btn btn-outline-success"
                    onClick={this.addNewQuiz}
                  >
                    Create
                  </button>
                </div>
              </form>
            </div>
          </Modal>
        </div>
      </div>
    );
  }
}

export default Admin;
