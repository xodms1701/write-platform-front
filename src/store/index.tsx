  
import { combineReducers } from 'redux';
import { loginState, login_reducer } from './login_watcher';

export type RootState = {
  login_reducer: loginState;
}

export default combineReducers<RootState>({
  login_reducer
});