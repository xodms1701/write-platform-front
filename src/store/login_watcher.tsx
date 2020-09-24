const CHANGE = "login_watcher/CHANGE" as const;

export type User = {
  email?: string;
  user_type?: string;
};

export const login_change = (
  login_yn: boolean,
  user: User
) => ({ type: CHANGE, login_yn, user });

type LoginWatcherAction = ReturnType<typeof login_change>;

type loginInitialState = {
  login_yn: boolean;
  user: User;
};

const loginInitialState = {
  login_yn: false,
  user: {}
};

export type loginState = {
  login_yn: boolean;
  user: User;
};

export function login_reducer(
  state = loginInitialState,
  action: LoginWatcherAction
): loginState {
  switch (action.type) {
    case CHANGE:
      return {
        login_yn: action.login_yn,
        user: action.user,
      };
    default:
      return state;
  }
}