import s from "./Post.module.css";

const Post = (props) => {
    return (
        <div className={s.item}>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaIYjNjAUpYEhaTLonFNpcdWUcpBR-l9XfEg&usqp=CAU" alt="" />
            {props.name}
            <div>
                <span>like {props.likesCount}</span>
            </div>
        </div>
    )
}
export default Post