import React, { useEffect, useState } from 'react'

export const ProfileStatusWithHooks = (props) => {

    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);

    const activateClick = () => {
        setEditMode(true);
    }

    const deActivateClick = () => {
        setEditMode(false);
        props.updateStatus(status);
    }

    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value);
    }

    useEffect(() => {
        setStatus(props.status);
    }, [props.status]);

    return (
        <div>
            {
                !editMode &&
                <span onDoubleClick={activateClick}>
                    <b>Status</b>: {props.status || '---'}
                </span>
            }
            {
                editMode &&
                <div>
                    <input onChange={onStatusChange} autoFocus={true} onBlur={deActivateClick} value={status} />
                </div>
            }
        </div>
    )

}
export default ProfileStatusWithHooks