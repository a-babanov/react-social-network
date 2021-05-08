import React from 'react';
import { connect } from 'react-redux';
import Profile from "./Profile"
import { getUserProfile, getUserStatus, updateUserStatus, savePhoto, saveProfile } from '../../redux/profile-reducer';
import { withRouter } from 'react-router';
import { withAuthredirectComponent } from '../../hoc/withAuthRedirectComponent';
import { compose } from 'redux';

class ProfileContainer extends React.Component {

    refreshProfile = () => {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = this.props.authorizedUserId;
            //userId = 16057
        };

        this.props.getUserProfile(userId);
        this.props.getUserStatus(userId);
    }

    componentDidMount() {
        this.refreshProfile();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.match.params.userId !== prevProps.match.params.userId)
            this.refreshProfile();
    }

    render() {
        return (
            <Profile {...this.props}
                isOwner={!this.props.match.params.userId || this.props.match.params.userId === this.props.authorizedUserId}
                saveProfile={this.props.saveProfile}
                savePhoto={this.props.savePhoto}
                profile={this.props.profile}
                status={this.props.status}
                updateStatus={this.props.updateUserStatus} />
        )
    }
}

let mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.userStatus,
        authorizedUserId: state.auth.userId
    }
}

export default compose(
    withAuthredirectComponent,
    connect(mapStateToProps, { getUserProfile, getUserStatus, updateUserStatus, savePhoto, saveProfile }),
    withRouter
)(ProfileContainer)