import { connect } from "react-redux";
import { follow, setUsers, unfollow, setTotalPageCount, setPage, setToggleIsFetching, toggleFollowingProgress, requestUsers } from "../../redux/users-reducer";
import Users from "./Users";
import React, { PureComponent } from 'react';
import Preloader from "../Common/Preloader/Preloader";
import { compose } from "redux";
import { getFollowingInProgress, getIsFetching, getPage, getPageSize, getTotalPageCount, getUsers } from "../../redux/users-selector";

class UsersContainer extends PureComponent {

    componentDidMount() {
        this.props.requestUsers(this.props.currentPage, this.props.pageSize);
    }

    onPageChanged(pageNumber) {
        this.props.setPage(pageNumber);
        this.props.requestUsers(pageNumber, this.props.pageSize);
    }

    render() {
        return <>
            {
                this.props.isFetching ? <Preloader /> : null
            }
            <Users totalPageCount={this.props.totalPageCount}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                users={this.props.users}
                onPageChanged={this.onPageChanged.bind(this)}
                setCurrentPage={this.props.setCurrentPage}
                follow={this.props.follow}
                unfollow={this.props.unfollow}
                followingInProgress={this.props.followingInProgress}
                toggleFollowingProgress={this.props.toggleFollowingProgress}
            />
        </>
    }

}

/*
const mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        totalPageCount: state.usersPage.totalPageCount,
        pageSize: state.usersPage.pageSize,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress
    }
}
*/

const mapStateToProps = (state) => {
    return {
        users: getUsers(state),
        totalPageCount: getTotalPageCount(state),
        pageSize: getPageSize(state),
        currentPage: getPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
}

export default compose(
    connect(mapStateToProps, { follow, unfollow, setUsers, setTotalPageCount, setPage, setToggleIsFetching, toggleFollowingProgress, requestUsers })
)(UsersContainer)
