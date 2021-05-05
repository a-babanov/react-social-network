import { usersAPI } from "../api/api";

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";
const SET_TOTAL_PAGE_COUNT = "SET_TOTAL_PAGE_COUNT";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_TOGGLE_IS_FETCHING = "SET_TOGGLE_IS_FETCHING";
const TOGGLE_IS_FOLLOWING_PROGRESS = "TOGGLE_IS_FOLLOWING_PROGRESS";
let initialState = {
    users: [

    ],
    totalPageCount: 0,
    pageSize: 5,
    page: 1,
    isFetching: true,
    followingInProgress: [],
    fake: 10
}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case "FAKE": {
            return {
                ...state,
                fake: state.fake + 1
            };
        }
        case FOLLOW: {
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId)
                        return { ...u, followed: true }
                    return { ...u }
                })
            };
        }
        case UNFOLLOW: {
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId)
                        return { ...u, followed: false }
                    return { ...u }
                })
            };
        }
        case SET_USERS: {
            return { ...state, users: action.users }
        }
        case SET_TOTAL_PAGE_COUNT: {
            return { ...state, totalPageCount: action.totalPageCount }
        }
        case SET_CURRENT_PAGE: {
            return { ...state, page: action.page }
        }
        case SET_TOGGLE_IS_FETCHING: {
            return { ...state, isFetching: action.isFetching }
        }
        case TOGGLE_IS_FOLLOWING_PROGRESS: {
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id != action.userId)
            }
        }
        default:
            return state;
    }
}

export const followSuccess = (userId) => ({ type: FOLLOW, userId })

export const unfollowSuccess = (userId) => ({ type: UNFOLLOW, userId })

export const setUsers = (users) => ({ type: SET_USERS, users })

export const setTotalPageCount = (totalPageCount) => ({ type: SET_TOTAL_PAGE_COUNT, totalPageCount })

export const setPage = (page) => ({ type: SET_CURRENT_PAGE, page })

export const setToggleIsFetching = (isFetching) => ({ type: SET_TOGGLE_IS_FETCHING, isFetching })

export const toggleFollowingProgress = (userId, isFetching) => ({ type: TOGGLE_IS_FOLLOWING_PROGRESS, userId, isFetching })

export const requestUsers = (page, pageSize) => {
    return (dispatch) => {
        dispatch(setToggleIsFetching(true));
        usersAPI.getUsers(page, pageSize)
            .then(data => {
                dispatch(setUsers(data.items));
                dispatch(setTotalPageCount(data.totalCount));
                dispatch(setToggleIsFetching(false));
            });
    }
}


export const follow = (userId) => {
    return (dispatch) => {
        dispatch(toggleFollowingProgress(userId, true));
        usersAPI.follow(userId)
            .then(response => {
                if (response.data.resultCode === 0)
                    dispatch(followSuccess(userId))
                dispatch(toggleFollowingProgress(userId, false))
            });
    }
}

export const unfollow = (userId) => {
    return (dispatch) => {
        dispatch(toggleFollowingProgress(userId, true));
        usersAPI.unfollow(userId)
            .then(response => {
                if (response.data.resultCode === 0)
                    dispatch(unfollowSuccess(userId))
                dispatch(toggleFollowingProgress(userId, false));
            })
    }
}

export default usersReducer;