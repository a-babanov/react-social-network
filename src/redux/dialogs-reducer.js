const SEND_MESSAGE = "SEND_MESSAGE";

let initialState = {
    dialogs: [
        { id: "1", name: "Altynbek" },
        { id: "2", name: "Nurlis" },
        { id: "3", name: "Elmus" },
        { id: "4", name: "Ravshan" },
        { id: "5", name: "Kuba" }
    ],
    messages: [
        { id: "1", message: "Hi!" },
        { id: "2", message: "Nice!" },
        { id: "3", message: "And you?" },
        { id: "4", message: "Nice too" }
    ]
}
const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEND_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, {
                    id: 5,
                    message: action.newMessage
                }]
            };
        default:
            return state;
    }
}

export const addMessage = (newMessage) => ({ type: SEND_MESSAGE, newMessage })

export default dialogsReducer;