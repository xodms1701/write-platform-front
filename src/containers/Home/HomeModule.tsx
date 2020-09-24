import React, { Component } from "react";
import AwesomeSlider from "react-awesome-slider";
import styles from "./Home.module.scss";
import classNames from "classnames/bind";
import redvelvet1 from "./../../assets/imgs/웰.jpg";
import redvelvet2 from "./../../assets/imgs/redvelvet2.jpg";
import redvelvet3 from "./../../assets/imgs/redvelvet3.jpg";
import redvelvet4 from "./../../assets/imgs/옐조.jpg";
import redvelvet5 from "./../../assets/imgs/배박.jpeg";
import noimage from "./../../assets/imgs/noimage.jpg";

import "react-awesome-slider/src/styles";

import {
  mapStateToProps,
  mapDispatchToProps,
  HomeProps,
  HomeState,
} from "./HomeType";
import { compose } from "redux";
import { connect } from "react-redux";
import Http from "./../../api";
import cookies from "react-cookies";
import { NavLink } from "react-router-dom";

const cx = classNames.bind(styles);

class HomeModule extends Component<HomeProps, HomeState> {
  state: HomeState = {
    series: [],
  };

  componentDidMount() {
    Http.post(
      "/series/list",
      { token: cookies.load("user") },
      { withCredentials: true }
    ).then((res) => {
      if (res.data.success) {
        this.setState({
          series: res.data.list,
        });
      }
    });
  }

  goToSeries = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {};

  render() {
    return (
      <div className={cx("body-wrapper")}>
        {this.props.login_reducer.login_yn ? (
          <div className={cx("series-wrapper")}>
            <h3>시리즈</h3>
            {this.state.series ? (
              <div className={cx("lists")}>
                {this.state.series.map((val, idx) => {
                  return (
                    <NavLink key={idx} to={"/series/" + val.no}>
                      <div className={cx("cover-img")}>
                        <img
                          alt=""
                          src={val.cover_img ? val.cover_img : noimage}
                        />
                      </div>
                      <div className={cx("name")}>{val.name}</div>
                      <div className={cx("content")}>{val.content}</div>
                      {val.create_dt ? (
                        <div className={cx("create-dt")}>
                          게시일: {val.create_dt}
                        </div>
                      ) : null}
                      {val.update_dt ? (
                        <div className={cx("update-dt")}>
                          수정일: {val.update_dt}
                        </div>
                      ) : null}
                    </NavLink>
                  );
                })}
              </div>
            ) : (
              <span>존재하지 않습니다.</span>
            )}
          </div>
        ) : (
          <AwesomeSlider
            className={cx("banner")}
            bullets={false}
            animation="scale-out-animation"
          >
            <div data-src={redvelvet1}>1</div>
            <div data-src={redvelvet2}>2</div>
            <div data-src={redvelvet3}>3</div>
            <div data-src={redvelvet4}>4</div>
            <div data-src={redvelvet5}>5</div>
          </AwesomeSlider>
        )}
      </div>
    );
  }
}

export default compose(connect(mapStateToProps, mapDispatchToProps))(
  HomeModule
);
