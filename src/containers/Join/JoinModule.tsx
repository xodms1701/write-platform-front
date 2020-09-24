import React, { Component } from "react";
import styles from "./Join.module.scss";
import classNames from "classnames/bind";
import { NavLink } from "react-router-dom";
import { JoinProps, JoinState } from "./JoinType";
import cookies from "react-cookies";
import Http from "./../../api";
import { mapDispatchToProps, mapStateToProps } from "../Home/HomeType";
import { compose } from "redux";
import { connect } from "react-redux";

const cx = classNames.bind(styles);

class JoinModule extends Component<JoinProps, JoinState> {
  state: JoinState = {
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
      email: event.target.value
    });
  }

  onChangePw = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      password: event.target.value
    });
  }

  goJoin = () => {
    Http.post(
      "/user/join",
      { email: this.state.email, password: this.state.password },
      { withCredentials: true }
    ).then(res => {
      if(res.data.success) {
        alert("회원가입에 성공하셨습니다. 로그인 화면으로 이동합니다.");
        this.props.history.push("login");
      } else {
        alert("아이디 혹은 비밀번호를 잘못 입력하셨거나 회원이 아닙니다.");
      }
    });
  }

  render() {
    return (
      <div className={cx("body-wrapper")}>
        <h3>회원가입</h3>
        <input onChange={this.onChangeEmail} type="email" placeholder="email" />
        <br />
        <input onChange={this.onChangePw} type="password" placeholder="password" />
        <br />
        <button onClick={this.goJoin}>회원가입</button>
        <div className={cx("login-bt")}>
          <NavLink to="/login">로그인하러가기</NavLink>
        </div>
      </div>
    );
  }
}

export default compose(connect(mapStateToProps, mapDispatchToProps))(JoinModule);
