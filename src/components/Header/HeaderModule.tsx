import React, { Component } from "react";
import {
  mapStateToProps,
  mapDispatchToProps,
  HeaderProps,
  HeaderState,
} from "./HeaderType";
import styles from "./Header.module.scss";
import classNames from "classnames/bind";
import logo from "./../../assets/imgs/facebook_cover_photo_1.png";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import cookies from "react-cookies";

const cx = classNames.bind(styles);

class HeaderModule extends Component<HeaderProps, HeaderState> {
  state: HeaderState = {};

  goLogout = () => {
    cookies.remove("user");
    window.location.reload();
  };

  render() {
    return (
      <div className={cx("header-wrapper")}>
        <div className={cx("logo")}>
          <NavLink to="/">
            <img width="170" alt="" src={logo} />
          </NavLink>
        </div>
        <div className={cx("right")}>
          <ul>
            {this.props.login_reducer.login_yn ? (
              <li>
                <input
                  className={cx("search-input")}
                  type="text"
                  placeholder="SEARCH"
                />
                <button className={cx("search-btn")}>
                  <FontAwesomeIcon icon={faSearch} />
                </button>
              </li>
            ) : null}
            <li>
              {this.props.login_reducer.login_yn ? (
                <button onClick={this.goLogout}>로그아웃</button>
              ) : (
                <NavLink to="/login">로그인/회원가입</NavLink>
              )}
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default compose(connect(mapStateToProps, mapDispatchToProps))(
  HeaderModule
);
