import { addMessage } from "../../redux/dialogs-reducer";
import Dialogs from './Dialogs';
import { connect } from 'react-redux';
import { withAuthredirectComponent } from "../../hoc/withAuthRedirectComponent";
import { compose } from "redux";

let mapStateToProps = (state) => ({
    state: state.dialogsPage
})

export default compose(
    withAuthredirectComponent,
    connect(mapStateToProps, { addMessage })
)(Dialogs)