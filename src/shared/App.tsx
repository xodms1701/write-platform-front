import React, { Component } from "react";
import { Switch, Route, RouteComponentProps, withRouter } from "react-router-dom";
import { Home, Login, Join, FindPW, Series, Board, JoinWriter } from "../containers";
import { Header, Footer } from "../components";
import { connect } from "react-redux";
import cookies from "react-cookies";
import Http from "./../api";
import { RootState } from "../store";
import { login_change } from "./../store/login_watcher";
import { returntypeof } from "react-redux-typescript";
import { bindActionCreators, compose } from "redux";

const mapStateToProps = (state: RootState) => ({
  login_reducer: state.login_reducer,
});

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      login_change: login_change,
    },
    dispatch
  );

const statePropTypes = returntypeof(mapStateToProps);
const actionPropsTypes = returntypeof(mapDispatchToProps);

type Props = typeof statePropTypes & typeof actionPropsTypes & RouteComponentProps & {};

class App extends Component<Props> {
  constructor(props: Props) {
    super(props);

    const token = cookies.load("user");

    if (token) {
      Http.post(
        "/user/is-login",
        { token: token },
        { withCredentials: true }
      ).then((response) => {
        if (response.data.success) {
          this.props.login_change(true, response.data.user);
        }else {
          this.props.login_change(false, {});
        }
      });
    }
  }

  componentDidUpdate(prevProps: RouteComponentProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return (
      <React.Fragment>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/join" component={Join} />
          <Route path="/find-pw" component={FindPW} />
          <Route path="/series/:series_id" component={Series} />
          <Route path="/board/:board_id" component={Board} />
          <Route path="/join-writer" component={JoinWriter} />
          {/* <Route path="/mypage" component={} /> */}
          {/* <Route path="mywrite"  /> */}
          
        </Switch>
        <Footer />
      </React.Fragment>
    );
  }
}

export default withRouter(compose(connect(mapStateToProps, mapDispatchToProps))(App));
