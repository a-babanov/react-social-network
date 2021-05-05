import React from 'react';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import s from "./Dialogs.module.css";
import { Field, reduxForm } from 'redux-form';
import { maxFieldLength, required } from '../Utils/validators/validators';
import { TextArea } from '../Common/FormsControls/FormsControls';

const Dialogs = (props) => {
    const addMessage = (values) => {
        props.addMessage(values.newMessage);
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                <div>
                    {
                        props.state.dialogs.map(d => <DialogItem name={d.name} id={d.id} />)
                    }
                </div>
            </div>
            <div className={s.messages}>
                <div>
                    {
                        props.state.messages.map(m => <Message message={m.message} />)
                    }
                </div>
                <AddNewMessageReduxForm onSubmit={addMessage} />
            </div>
        </div>
    )
}
export default Dialogs
let maxLength50 = maxFieldLength(50);
const AddNewMessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field component={TextArea}
                validate={[required, maxLength50]}
                name="newMessage" placeholder="Enter your message" />
            <div>
                <button>Send Message</button>
            </div>
        </form>
    )
}

const AddNewMessageReduxForm = reduxForm({ form: "AddNewMessageForm" })(AddNewMessageForm)