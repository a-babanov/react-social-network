import { stopSubmit } from "redux-form";
import { authAPI, securityAPI } from "../api/api";

const SET_USER_DATA = "SET_USER_DATA";
const SET_CAPTCHA_URL_SUCCESS = "SET_CAPTCHA_URL_SUCCESS";
const SET_NULL_TO_CAPTCHA_URL = "SET_NULL_TO_CAPTCHA_URL";

let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
        case SET_CAPTCHA_URL_SUCCESS: {
            return {
                ...state,
                ...action.payLoad
            };
        }
        case SET_NULL_TO_CAPTCHA_URL: {
            return {
                ...state,
                ...action.payLoad
            };
        }
        default:
            return state;
    }
}

export const setAuthUserData = (userId, email, login, isAuth = false) => ({ type: SET_USER_DATA, payLoad: { userId, email, login, isAuth } })
export const setCaptchaUrlSuccess = (captchaUrl) => ({ type: SET_CAPTCHA_URL_SUCCESS, payLoad: { captchaUrl } })
export const setNullToCaptchaUrl = (captchaUrl) => ({ type: SET_CAPTCHA_URL_SUCCESS, payLoad: { captchaUrl } })

export const getAuthUserData = () => (dispatch) => {
    return authAPI.me()
        .then(response => {
            if (response.data.resultCode === 0) {
                let { id, email, login } = response.data.data;
                dispatch(setAuthUserData(id, email, login, true))
            }
        });
}

export const login = (email, password, rememberMe, captcha) => (dispatch) => {
    authAPI.login(email, password, rememberMe, captcha)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(getAuthUserData())
                dispatch(setNullToCaptchaUrl(null))
            }
            else {
                if (response.data.resultCode === 10) {
                    debugger
                    dispatch(getCaptchaUrl())
                }
                let message = response.data.messages.length > 0 ? response.data.messages[0] : "some error";
                dispatch(stopSubmit("login", { _error: message }));
            }
        });
}

export const getCaptchaUrl = () => async (dispatch) => {
    const response = await securityAPI.getCaptchaUrl();
    dispatch(setCaptchaUrlSuccess(response.data.url));
}

export const logout = () => (dispatch) => {
    authAPI.logout()
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setAuthUserData(null, null, null, false))
            }
        });
}

export default authReducer;