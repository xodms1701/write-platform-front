import React, { Component } from "react";
import styles from "./FindPw.module.scss";
import classNames from "classnames/bind";
import { NavLink } from "react-router-dom";

const cx = classNames.bind(styles);

class FindPwModule extends Component {
  render() {
    return (
      <div className={cx("body-wrapper")}>
        <h3>비밀번호 찾기</h3>

        <div className={cx("info")}>
          이메일 인증할 돈이 없어요. 죄송해요.<br />
          비번 까먹으셨으면 트위터 @again_againWow로 디엠주세요.<br/>
          감사합니다.
        </div>

        <div className={cx("login-bt")}>
          <NavLink to="/login">로그인하러가기</NavLink>
          <NavLink to="/join">회원가입</NavLink>
        </div>
      </div>
    );
  }
}

export default FindPwModule;
