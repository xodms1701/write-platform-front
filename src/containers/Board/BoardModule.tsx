import React, { Component } from "react";
import style from "./Board.module.scss";
import classNames from "classnames/bind";
import { RouteComponentProps, NavLink } from "react-router-dom";
import cookies from "react-cookies";
import Http from "./../../api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(style);

type Props = {
  match: {
    params: any;
  };
} & RouteComponentProps;

type State = {
  Series: { name: string; no: number };
  content: string;
  create_dt: string;
  notice_yn: boolean;
  secret_yn: boolean;
  sub_title: string;
  title: string;
  update_dt: string;
};

class BoardModule extends Component<Props, State> {
  state: State = {
    title: "",
    sub_title: "",
    notice_yn: false,
    secret_yn: false,
    content: "",
    create_dt: "",
    update_dt: "",
    Series: {
      name: "",
      no: 0,
    },
  };

  componentDidMount() {
    const { board_id } = this.props.match.params;

    Http.post(
      "/board/detail",
      {
        token: cookies.load("user"),
        board_id: board_id,
      },
      { withCredentials: true }
    ).then((result) => {
      console.log(result);
      this.setState({
        ...result.data.board,
      });
    });
  }

  render() {
    return (
      <div className={cx("board-wrapper")}>
        <div className={cx("series-info")}>
          <NavLink to={"/series/" + this.state.Series.no}>
            <FontAwesomeIcon icon={faAngleLeft} />
            {this.state.Series.name}
          </NavLink>
        </div>
        <div className={cx("title-wrapper")}>
          <div className={cx("wrapper")}>
            <div className={cx("title")}>{this.state.title}</div>
            <div className={cx("sub-title")}>{this.state.sub_title}</div>
          </div>
          <div className={cx("date-wrapper")}>
            {this.state.create_dt}
            {this.state.update_dt ? " / " + this.state.update_dt : null}
          </div>
        </div>
        <div className={cx("content-wrapper")}>{this.state.content}</div>
        <div className={cx("reply-wrapper")}>
          <div className={cx("title")}>댓글</div>
          <div className={cx("reply-list")}>
            댓글이 없습니다.
          </div>
          <div className={cx("input-form")}>
            <label>
              비밀댓글
              <input
                id="is-secret"
                type="checkbox"
                name="secret"
                value="비밀댓글"
              />
            </label>
            <div className={cx("input")}>
              <textarea></textarea>
              <button type="submit" className={cx("submit")}>
                전송
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default BoardModule;
