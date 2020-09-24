import { RootState } from "../../store";
import { bindActionCreators } from "redux";
import { login_change } from "../../store/login_watcher";
import { returntypeof } from "react-redux-typescript";

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

export type HeaderProps = typeof statePropTypes & typeof actionPropsTypes & {};
export type HeaderState = {};