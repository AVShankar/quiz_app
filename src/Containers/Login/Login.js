import React from "react";
import "./Login.css";
import $ from "jquery";

class Login extends React.Component {
  componentDidMount() {
    $(document).ready(function () {
      $(".input").focus(function () {
        $(this).parent().find(".label-txt").addClass("label-active");
      });
      $(".input").focusout(function () {
        if ($(this).prop("required")) {
          if ($(this).val() === "") {
            $(this).parent().find(".label-txt").removeClass("label-active");
            $(this).parent().find(".line-box").addClass("line-red");
          } else {
            $(this).parent().find(".line-box").removeClass("line-red");
          }
        } else {
          if ($(this).val() === "") {
            $(this).parent().find(".label-txt").removeClass("label-active");
          }
        }
      });
    });
  }

  handleSignUp = (e) => {
      e.preventDefault();
      let userDetails = {
        user_name: $("#newUserName").val(),
        email: $("#newUserEmailAddress").val(),
        password: $("#newUserPassword").val(),
        school_name: "Demo_School",
        prev_quiz: [],
        admin: 0
      }
      $.ajax({
          url: "http://127.0.0.1:5000/signup",
          method: "POST",
          data: userDetails
      }).then(res => {
          this.props.updateUserData(res);
      }).catch(function(err){
          console.log('Something went wrong! Please try again');
          console.error(err);
      })
  }

  handleLogin = (e) => {
      e.preventDefault();
      let loginDetails = {
          email: $("#userEmailAddress").val(),
          password: $("#userPassword").val()
      }

      $.ajax({
          url: "http://127.0.0.1:5000/login",
          type: "POST",
          data: loginDetails
      }).then(res => {
        this.props.updateUserData(res);
      }).catch(err => {
        console.log(err);
      })
  }

  render() {
    return (
      <div className="container-fluid pt-5">
        <div className="container p-5">
          <div className="shadow bg-light">
          <div className="p-4">
                    <h4 className="text-center">Welcome to Demo_School Quiz App</h4>
                </div>
            <div className="row">
              <div className="col-md-5 col-sm-12 justify-content-center align-self-center">
                <div className="p-4">
                  <h4 className="text-center">LOGIN HERE</h4>
                  <form>
                    <div className="form-group">
                      <label htmlFor="userEmailAddress">
                        <p className="label-txt">Email address :</p>
                        <input
                          type="email"
                          className="input"
                          id="userEmailAddress"
                          required
                        />
                        <div className="line-box">
                          <div className="line"></div>
                        </div>
                      </label>
                    </div>
                    <div className="form-group">
                      <label htmlFor="userPassword">
                        <p className="label-txt">Password :</p>
                        <input
                          type="password"
                          className="input"
                          id="userPassword"
                          required
                        />
                        <div className="line-box">
                          <div className="line"></div>
                        </div>
                      </label>
                    </div>
                    <div className="d-flex justify-content-end">
                      <button
                        type="submit"
                        id="login"
                        className="btn btn-success"
                        onClick = {this.handleLogin}
                      >
                        Login
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div className="col-md-1 col-sm-12 justify-content-center align-self-center">
              <h4 className="text-center">OR</h4>
              </div>
              <div className="col-md-6 col-sm-12 justify-content-center align-self-center">
                <div className="p-4">
                  <h4 className="text-center">SIGNUP HERE</h4>
                  <form>
                    <div className="form-group">
                      <label htmlFor="newUserName">
                        <p className="label-txt">Name :</p>
                        <input
                          type="text"
                          className="input"
                          id="newUserName"
                          required
                        />
                        <div className="line-box">
                          <div className="line"></div>
                        </div>
                      </label>
                    </div>
                    <div className="form-group">
                      <label htmlFor="newUserEmailAddress">
                        <p className="label-txt">Email :</p>
                        <input
                          type="email"
                          className="input"
                          id="newUserEmailAddress"
                          required
                        />
                        <div className="line-box">
                          <div className="line"></div>
                        </div>
                      </label>
                    </div>
                    <div className="form-group">
                      <label htmlFor="newUserPassword">
                        <p className="label-txt"> New Password :</p>
                        <input
                          type="password"
                          className="input"
                          id="newUserPassword"
                          required
                        />
                        <div className="line-box">
                          <div className="line"></div>
                        </div>
                      </label>
                    </div>
                    <div className="d-flex justify-content-end">
                      <button
                        type="submit"
                        id="submit"
                        className="btn btn-primary"
                        onClick={this.handleSignUp}
                      >
                        Sign Up
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
