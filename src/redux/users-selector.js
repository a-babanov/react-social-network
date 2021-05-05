import { createSelector } from "reselect";

const getUsersSelector = (state) => {
    return state.usersPage.users;
}

export const getUsers = createSelector(getUsersSelector, (users) => {
    return users.filter(value => true);
});

export const getTotalPageCount = (state) => {
    return state.usersPage.totalPageCount;
}

export const getPageSize = (state) => {
    return state.usersPage.pageSize;
}

export const getPage = (state) => {
    return state.usersPage.page;
}

export const getIsFetching = (state) => {
    return state.usersPage.isFetching;
}

export const getFollowingInProgress = (state) => {
    return state.usersPage.followingInProgress;
}