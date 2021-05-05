import React from 'react';
import Preloader from '../../Common/Preloader/Preloader'
import s from './ProfileInfo.module.css'
import ProfileStatusWithHooks from './ProfileStatusWithHooks'
import userPhotoUrl from '../../../assets/images/UsersPhoto.jpg'

const ProfileInfo = React.memo((props) => {
    if (!props.profile) {
        return <Preloader />
    }

    let onMainPhotoSelected = (e) => {
        if (e.target.files.length)
            props.savePhoto(e.target.files[0])
    }

    return (
        <div>
            <div className={s.descriptionBlock}>
                <img src={props.profile.photos.large != null ? props.profile.photos.large : userPhotoUrl} alt="" />
                {
                    props.isOwner === true
                        ? <input type="file" onChange={onMainPhotoSelected} />
                        : ""
                }
                <div>ava + description</div>
                <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus} />
            </div>
        </div>
    )
});
export default ProfileInfo