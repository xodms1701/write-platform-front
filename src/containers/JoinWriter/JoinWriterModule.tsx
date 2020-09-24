import React, { Component } from "react";
import classNames from "classnames/bind";
import style from "./JoinWriter.module.scss";
import bannerImage from "./../../assets/imgs/welcome.jpg";
import Http from "./../../api";
import cookies from "react-cookies";

const cx = classNames.bind(style);

type Props = {};

type State = {
  content: string;
};

class JoinWriterModule extends Component<Props, State> {
  state: State = {
    content: ""
  };

  onChangeContent = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.setState({
      content: event.target.value
    });
  }

  goJoinWriter = () => {
    const token = cookies.load("user");

    if (token) {
      Http.post(
        "/user/is-login",
        { token: token },
        { withCredentials: true }
      ).then((response) => {
        if (response.data.success) {
          Http.post(
            '/user/join-writer', 
            { email: response.data.user.email, content: this.state.content },
            { withCredentials: true })
            .then(response => {
              if(response.data.success) {
                alert("신청이 완료되었습니다.");
              }else {
                alert(response.data.message);
              }
            });
        } else {
          alert(response.data.message);
        }
      });
    }
  }

  render() {
    return (
      <div className={cx('body-wrapper')}>
        <img src={bannerImage} width="1200" alt="welcome" />
        <h2>보헤미안의 작가가 되고 싶으신가요?</h2>
        <p>잘 생각 하셨습니다!</p>
        <p>누구나 작가의 꿈을 한 번쯤은 꿔 보셨을거에요. 이 곳에서는 무료로, 누구나 글을 쓸 수 있습니다.</p>
        <p>사이트 관리자에게 하실 말씀이 있다면 하단의 입력 칸에 적어주시고, 없다면 적지 않으셔도 됩니다.</p>
        <p>관리자가 여러분의 신청을 확인하고 승인 해드리겠습니다.</p>
        <p>만약 빠른 승인을 원하신다면 사이트 하단에 있는 트위터 아이디로 연락해주세요.</p>
        <p>준비 되셨다면, 신청 해주세요.</p>
        <br />

        <textarea onChange={this.onChangeContent} placeholder="사이트 관리자에게 하고 싶은 말"></textarea><br />

        <button onClick={this.goJoinWriter}>I want to be a Writer!</button>
      </div>
    )
  }
}

export default JoinWriterModule;