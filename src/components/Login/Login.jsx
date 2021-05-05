import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Input } from '../Common/FormsControls/FormsControls';
import { required } from '../Utils/validators/validators';
import { login } from '../../redux/auth-reducer';
import { Redirect } from 'react-router';
import style from './../Common/FormsControls/FormsControls.module.css'
const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={"Login"} name={"email"}
                    component={Input} validate={[required]} />
            </div>
            <div>
                <Field placeholder={"Password"} name={"password"} type={"password"}
                    component={Input} validate={[required]} />
            </div>
            <div>
                <Field component={"input"} type={"checkbox"} name={"rememberMe"} /> remember me
            </div>
            {
                props.error &&
                <span className={style.formSummaryError}>
                    {props.error}
                </span>
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
        props.login(formData.email, formData.password, formData.rememberMe);
    }
    if (props.isAuth) {
        return <Redirect to='/profile' />
    }
    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} />
        </div>
    )
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})
export default connect(mapStateToProps, { login })(Login);