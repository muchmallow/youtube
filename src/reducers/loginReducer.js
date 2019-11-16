// eslint-disable-next-line camelcase
import jwt_decode from "jwt-decode";
import { authAPI } from "../api/api";

const SET_USER_ID = "login/SET_USER_ID";
const SET_USER_INFO = "login/SET_USER_INFO";
const LOG_OUT = "login/LOG_OUT";
const RESET_IS_AUTH = "login/RESET_IS_AUTH";

const initialState = {
  isAuth: false,
  token: null,
  userId: null,
  decodedToken: {},
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_ID: {
      return {
        ...state,
        userId: action.userId,
      };
    }
    case SET_USER_INFO: {
      return {
        ...state,
        token: action.token,
        decodedToken: { ...action.decodedToken },
        isAuth: true,
      };
    }
    case RESET_IS_AUTH: {
      return {
        ...state,
        isAuth: false
      }
    }
    case LOG_OUT: {
      return {
        ...initialState,
      };
    }
    default:
      return state;
  }
};

const setUserId = userId => ({
  type: SET_USER_ID,
  userId,
});

const setUserInfo = (token, decodedToken) => ({
  type: SET_USER_INFO,
  token,
  decodedToken,
});

export const resetIsAuth = () => ({
  type: RESET_IS_AUTH,
});

export const logOutInfo = () => ({
  type: LOG_OUT,
});

export const getAuthLink = userId => async dispatch => {
  dispatch(setUserId(userId));
  try {
    await authAPI.getAuth(userId);
  } catch (error) {
    window.location.href = error.response.data.url;
  }
};

export const getToken = () => async dispatch => {
  const url = window.location.href;
  const urlObject = new URL(url);
  const authCode = urlObject.searchParams.get("code");
  const validAuthCode = authCode.replace("/", "%2F");
  const result = await authAPI.getToken(validAuthCode);
  const decodedToken = jwt_decode(result.data);
  await dispatch(setUserInfo(result.data, decodedToken));
};

export default loginReducer;
