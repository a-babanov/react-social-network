import React from 'react'

class ProfileStatus extends React.Component {

    state = {
        editMode: false,
        status: this.props.userStatus
    }

    activateClick = () => {
        this.setState({ editMode: true })
    }

    deActivateClick = () => {
        this.setState({ editMode: false })
        this.props.updateUserStatus(this.state.status)
    }

    onStatusChange = (e) => {
        this.setState({
            status: e.currentTarget.value
        })
    }

    componentDidUpdate(prevProps, prevState) {
        //debugger;
        if (prevProps.userStatus !== this.props.userStatus) {
            this.setState({
                status: this.props.userStatus
            })
        }
        console.log("componentDidUpdate")
    }

    render() {
        return (
            <div>
                {
                    !this.state.editMode &&
                    <span onDoubleClick={this.activateClick}>
                        {this.props.userStatus || '---'}
                    </span>
                }
                {
                    this.state.editMode &&
                    <div>
                        <input onChange={this.onStatusChange} autoFocus={true} onBlur={this.deActivateClick} value={this.state.status} />
                    </div>
                }
            </div>
        )
    }
}
export default ProfileStatus