import React, { Component } from "react";
import style from "./Series.module.scss";
import classNames from "classnames/bind";
import { RouteComponentProps, NavLink } from "react-router-dom";
import cookies from "react-cookies";
import noimage from "./../../assets/imgs/noimage.jpg";

import Http from "./../../api";

const cx = classNames.bind(style);

type Props = {
  match: {
    params: any;
  };
} & RouteComponentProps;

type State = {
  name: string;
  content: string;
  cover_img: string;
  create_dt: string;
  update_dt: string;
  state: string;
  Boards: {
    no: number;
    title: string;
    sub_title: string;
    content: string;
    notice_yn: boolean;
    secret_yn: boolean;
    create_dt: string;
    update_dt: string;
    thumb: string;
  }[];
};

class SeriesModule extends Component<Props, State> {
  state: State = {
    name: "",
    content: "",
    cover_img: "",
    create_dt: "",
    update_dt: "",
    state: "",
    Boards: [],
  };

  componentDidMount() {
    const { series_id } = this.props.match.params;

    Http.post(
      "/series/detail",
      {
        token: cookies.load("user"),
        series_id: series_id,
      },
      { withCredentials: true }
    ).then((result) => {
      this.setState({
        ...result.data.list,
      });
    });
  }

  render() {
    return (
      <div className={cx("series-wrapper")}>
        <div className={cx("title-wrapper")}>
          <div className={cx("thumb")}>
            <img
              src={this.state.cover_img ? this.state.cover_img : noimage}
              alt=""
            />
          </div>
          <div className={cx("info")}>
            <div className={cx("title")}>{this.state.name}</div>
            <div className={cx("content")}>{this.state.content}</div>
            <div className={cx("create_dt")}>
              올린 날짜 : {this.state.create_dt}
            </div>
            {this.state.update_dt ? (
              <div className={cx("update_dt")}>
                수정된 날짜 : {this.state.update_dt}
              </div>
            ) : null}
          </div>
        </div>
        <div className={cx("board-wrapper")}>
          <div className={cx("list")}>
            {this.state.Boards.length ? (
              this.state.Boards.map((value) => {
                return (
                  <NavLink
                    className={cx("item")}
                    key={value.no}
                    to={"/board/" + value.no}
                  >
                    <div className={cx("thumb")}>
                      <img src={value.thumb ? value.thumb : noimage} alt="" />
                    </div>
                    <div className={cx("title-wrapper")}>
                      <div className={cx("title")}>{value.title}</div>
                      <div className={cx("sub-title")}>{value.sub_title}</div>
                      <div className={cx("dt")}>
                        <span>{value.create_dt + " "}</span>
                        {value.update_dt ? (
                          <span>/ {value.update_dt}</span>
                        ) : null}
                      </div>
                    </div>
                  </NavLink>
                );
              })
            ) : (
              <div className={cx("no-board")}>
                이 시리즈에는 글이 존재하지 않습니다.
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default SeriesModule;
