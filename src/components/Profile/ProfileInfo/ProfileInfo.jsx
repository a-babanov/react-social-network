import React, { useEffect, useState } from 'react';
import Preloader from '../../Common/Preloader/Preloader'
import s from './ProfileInfo.module.css'
import ProfileStatusWithHooks from './ProfileStatusWithHooks'
import userPhotoUrl from '../../../assets/images/UsersPhoto.jpg'
import ProfileData from './ProfileData';
import ProfileDataReduxForm from './ProfileDataForm';

const ProfileInfo = React.memo(({ profile, saveProfile, ...props }) => {
    let [editMode, setEditMode] = useState(false);

    if (!profile) {
        return <Preloader />
    }

    let onMainPhotoSelected = (e) => {
        if (e.target.files.length)
            props.savePhoto(e.target.files[0])
    }

    let onSubmit = (formData) => {
        saveProfile(formData).then(() => {
            setEditMode(false);
        })
    }

    console.log(editMode)
    return (
        <div>
            <div className={s.descriptionBlock}>
                <img src={profile.photos.large != null ? profile.photos.large : userPhotoUrl} alt="" />
                {
                    props.isOwner === true
                        ? <input type="file" onChange={onMainPhotoSelected} />
                        : ""
                }

                {
                    editMode
                        ? <ProfileDataReduxForm initialValues={profile} profile={profile} onSubmit={onSubmit} />
                        : <ProfileData profile={profile} isOwner={props.isOwner} goToEditMode={() => { setEditMode(true) }} />
                }

                <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus} />
            </div>
        </div>
    )
});

export default ProfileInfo
