import React, {Component} from "react";
import styles from './Footer.module.scss';
import classNames from 'classnames/bind';
import { NavLink } from "react-router-dom";

const cx = classNames.bind(styles);

class FooterModule extends Component {
  render() {
    return (
      <div className={cx('footer-wrapper')}>
        <div className={cx('wrapper')}>
          <ul>
            <li><NavLink to="/about">소개</NavLink></li>
            <li><NavLink to="/use-terms">이용약관</NavLink></li>
            <li><NavLink to="/join-writer">작가 신청</NavLink></li>
          </ul>
          사이트 소유자 : 트위터 @again_againWow
        </div>
      </div>
    );
  }
}

export default FooterModule;