import { RootState } from "../../store";
import { bindActionCreators } from "redux";
import { login_change } from "../../store/login_watcher";
import { returntypeof } from "react-redux-typescript";
import { RouteComponentProps } from "react-router-dom";

export const mapStateToProps = (state: RootState) => ({
  login_reducer: state.login_reducer
});

export const mapDispatchToProps = (dispatch: any) => 
  bindActionCreators(
    {
      login_change: login_change
    },
    dispatch
  )

const statePropTypes = returntypeof(mapStateToProps);
const actionPropsTypes = returntypeof(mapDispatchToProps);

export type JoinProps = typeof statePropTypes & typeof actionPropsTypes & RouteComponentProps & {};
export type JoinState = {
  email: string;
  password: string;
};