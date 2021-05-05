import React from 'react';
import Preloader from '../../Common/Preloader/Preloader'
import s from './ProfileInfo.module.css'
import ProfileStatusWithHooks from './ProfileStatusWithHooks'
import userPhotoUrl from '../../../assets/images/UsersPhoto.jpg'

const ProfileInfo = React.memo((props) => {
    if (!props.profile) {
        return <Preloader />
    }

    return (
        <div>
            <div>
                {
                    /** 
                     <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKS3nWdWW8perlDu5KZ8WAaOoOP96OMgB9Xg&usqp=CAU" alt="" />
                    */
                }
            </div>
            <div className={s.descriptionBlock}>
                <img src={props.profile.photos.large != null ? props.profile.photos.large : userPhotoUrl} alt="" />
                <div>ava + description</div>
                <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus} />
            </div>
        </div>
    )
});
export default ProfileInfo