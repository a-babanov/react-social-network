import User from './User';
import Pagination from '../Common/Paginator';

const Users = (props) => {
    return (
        <div>
            <div>
                <Pagination {...props} />
                <div>
                    {
                        props.users.map(u => {
                            return <User user={u} {...props} />
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Users;