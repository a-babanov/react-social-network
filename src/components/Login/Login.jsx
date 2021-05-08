import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Input } from '../Common/FormsControls/FormsControls';
import { required } from '../Utils/validators/validators';
import { login } from '../../redux/auth-reducer';
import { Redirect } from 'react-router';
import style from './../Common/FormsControls/FormsControls.module.css'
const LoginForm = ({ handleSubmit, error, captchaUrl }) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Field placeholder={"Login"} name={"email"}
                    component={Input} validate={[required]} />
            </div>
            <div>
                <Field component={Input} placeholder={"Password"}
                    name={"password"} type={"password"} validate={[required]} />
            </div>
            <div>
                <Field component={Input} name={"rememberMe"} type={"checkbox"} /> remember me
            </div>

            {
                captchaUrl && <img alt="" src={captchaUrl} />
            }
            {
                captchaUrl && <div>
                    <Field component={Input} placeholder={"Input symbols from image"}
                        name={"captcha"} validate={[required]} />
                </div>
            }
            {
                error && <span className={style.formSummaryError}>{error}</span>
            }

            <div>
                <button>submit</button>
            </div>
        </form>
    );
}

const LoginReduxForm = reduxForm({ form: 'login' })(LoginForm)

const Login = (props) => {
    let onSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha);
    }
    if (props.isAuth) {
        return <Redirect to='/profile' />
    }
    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
        </div>
    )
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl
})
export default connect(mapStateToProps, { login })(Login);