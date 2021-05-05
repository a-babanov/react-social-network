import React from "react"
import { connect } from "react-redux"
import { Redirect } from "react-router"

let mapStateToPropsForRedirect = (state) => {
    return {
        isAuth: state.auth.isAuth
    }
}

export const withAuthredirectComponent = (Component) => {
    class RedirectComponent extends React.Component {
        render() {
            if (!this.props.isAuth)
                return <Redirect to='/login' />
            return <Component {...this.props} />
        }
    }
    let withAuthredirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent);

    return withAuthredirectComponent;
}