import Post from "./Post/Post"
import s from './MyPosts.module.css'
import React from 'react';
import { Field, reduxForm } from 'redux-form'
import { maxFieldLength, required } from "../../Utils/validators/validators";
import { TextArea } from "../../Common/FormsControls/FormsControls";

const MyPosts = React.memo((props) => {
    let onAddPost = (vaules) => {
        props.addPost(vaules.newPostText);
    }

    return (
        <div className={s.postsBlock}>
            <h3>My Posts</h3>
            <AddPostReduxForm onSubmit={onAddPost} />
            <div className={s.posts}>
                {
                    props.posts.map(p => {
                        return <Post name={p.message} likesCount={p.likesCount} />;
                    })
                }
            </div>
        </div>
    )

});
export default MyPosts

const maxLength = maxFieldLength(10);

const AddPostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={TextArea} name="newPostText"
                    validate={[required, maxLength]} />
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    );
}

const AddPostReduxForm = reduxForm({ form: "AddPostForm" })(AddPostForm)