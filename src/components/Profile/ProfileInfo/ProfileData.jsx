import React from 'react';
import s from './ProfileInfo.module.css';

const ProfileData = React.memo(({ profile, isOwner, goToEditMode }) => {
    return (
        <div>
            {isOwner && <button onClick={() => { goToEditMode() }}>edit</button>}
            <div><b>Full name</b>: {profile.fullName}</div>
            <div><b>Looking for a job</b>: {profile.lookingForAJob ? "Yes" : "No"}</div>
            {profile.lookingForAJob && <div><b>My professional skills</b>: {profile.lookingForAJobDescription}</div>}
            <div><b>About me</b>: {profile.aboutMe}</div>
            <div><b>Contacts</b>: {
                Object.keys(profile.contacts).map((key) => {
                    return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]} />
                })}
            </div>
        </div >
    )
});

const Contact = ({ contactTitle, contactValue }) => {
    return (
        <div className={s.contact}><b>{contactTitle}</b>: {contactValue}</div>
    )
}

export default ProfileData
