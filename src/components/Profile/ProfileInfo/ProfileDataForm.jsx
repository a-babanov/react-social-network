import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Input, TextArea } from '../../Common/FormsControls/FormsControls';
import s from './ProfileInfo.module.css';
import style from '../../Common/FormsControls/FormsControls.module.css';

const ProfileDataForm = React.memo(({ handleSubmit, error, profile }) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <button>save</button>
            </div>

            {error && <span className={style.formSummaryError}>{error}</span>}

            <div>
                <b>Full name</b>:
                <Field component={Input} placeholder={"Full name"}
                    name="fullName" />
            </div>

            <div>
                <b>Looking for a job</b>:
                <Field component={Input} type="checkbox" placeholder={"Looking for a job"}
                    name="lookingForAJob" />
            </div>

            <div>
                <b>My professional skills</b>:
                <Field component={TextArea} placeholder={"My professional skills"}
                    name="lookingForAJobDescription" />
            </div>

            <div>
                <b>About me</b>:
                <Field component={TextArea} placeholder={"About me"}
                    name="aboutMe" />
            </div>

            <div>
                <b>Contacts</b>: {
                    Object.keys(profile.contacts).map((key) => {
                        return <div key={"contacts." + key} className={s.contact}>
                            <b>{key}</b>: <Field component={Input}
                                placeholder={key} name={"contacts." + key} />
                        </div>
                    })
                }
            </div>
        </form>
    )
});

const ProfileDataReduxForm = reduxForm({ form: "edit-profile" })(ProfileDataForm)

export default ProfileDataReduxForm
