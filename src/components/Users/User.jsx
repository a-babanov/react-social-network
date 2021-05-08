import s from './Users.module.css';
import userPhotoUrl from '../../assets/images/UsersPhoto.jpg';
import { NavLink } from 'react-router-dom';
import React from 'react';

const User = React.memo(({ user, followingInProgress, follow, unfollow }) => {
    return (
        <div className={s.userPage}>
            <span>
                <NavLink to={'/profile/' + user.id}>
                    <div className={s.userPhoto} >
                        <img src={user.photos.large != null ? user.photos.large : userPhotoUrl} alt="" className={s.userPhoto} />
                    </div>
                </NavLink>

                {
                    user.followed === false
                        ? <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => { follow(user.id) }}>
                            Follow
                                                  </button>
                        : <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => { unfollow(user.id) }} >
                            UnFollow
                                                  </button>
                }

            </span>
            <span>
                <span>
                    <div>{user.id}</div>
                    <div>name: {user.name}</div>
                    <div>status: {user.status}</div>
                </span>
                <span>
                    {/*<div>{u.location.country}</div>
                                <div>{u.location.city}</div>*/}
                </span>
            </span>
        </div>
    )
});

export default User;