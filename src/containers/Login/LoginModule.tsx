import React, { Component } from "react";
import styles from "./Login.module.scss";
import classNames from "classnames/bind";
import { NavLink } from "react-router-dom";
import Http from "./../../api";
import cookies from "react-cookies";
import { mapStateToProps, mapDispatchToProps, LoginProps, LoginState } from "./LoginType";
import { compose } from "redux";
import { connect } from "react-redux";

const cx = classNames.bind(styles);

class LoginModule extends Component<LoginProps, LoginState> {
  state: LoginState = {
    email: "",
    password: ""
  };

  componentDidMount() {
    const token = cookies.load("user");

    if (token) {
      Http.post(
        "/user/is-login",
        { token: token },
        { withCredentials: true }
      ).then((response) => {
        if (response.data.success) {
          this.props.login_change(true, response.data.user);
          this.props.history.push("/");
        } else {
          this.props.login_change(false, {});
        }
      });
    }
  }

  onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      email: event.currentTarget.value,
    });
  };

  onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      password: event.currentTarget.value,
    });
  };

  goLogin = () => {
    Http.post(
      "/user/login",
      { email: this.state.email, password: this.state.password },
      { withCredentials: true }
    ).then(res => {
      if(res.data.success) {
        if(cookies.load('user')) {
          this.props.login_change(true, res.data.user);
          this.props.history.push('/');
        } else {
          alert("아이디 혹은 비밀번호를 잘못 입력하셨거나 회원이 아닙니다.");
        }
      } else {
        alert("아이디 혹은 비밀번호를 잘못 입력하셨거나 회원이 아닙니다.");
      }
    });
  };

  render() {
    return (
      <div className={cx("body-wrapper")}>
        <h3>로그인</h3>
        <input type="email" placeholder="email" onChange={this.onChangeEmail} />
        <br />
        <input
          type="password"
          placeholder="password"
          onChange={this.onChangePassword}
        />
        <br />
        <button onClick={this.goLogin}>로그인</button>
        <div className={cx("login-bt")}>
          <NavLink to="/join">회원가입</NavLink>
          <NavLink to="/find-pw">비밀번호찾기</NavLink>
        </div>
      </div>
    );
  }
}

export default compose(connect(mapStateToProps, mapDispatchToProps))(LoginModule);
