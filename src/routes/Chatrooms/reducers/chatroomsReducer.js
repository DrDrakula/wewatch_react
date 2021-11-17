import axios from 'axios'

const initialState = {
    chatrooms: [],
    fetchingChatrooms: true,
    errorMessage: ""
}

// ************************ REDUCER ************************
export function chatroomsReducer(state = initialState, action) {
    switch(action.type) {
        case "SET_CHATROOMS":
            return {
                ...state,
                chatrooms: action.payload
            }
        case "TOGGLE_FETCHING_CHATROOMS":
            return {
                ...state,
                fetchingChatrooms: action.payload
            }
        case "SET_CHATROOMS_ERROR_MESSAGE":
            return {
                ...state,
                errorMessage: action.payload
            }
        case "RESET_CHATROOMS_STATE":
            return initialState
        default:
            return state
    }
}

// ************************ ACTIONS ************************
export const toggleFetchingChatrooms = (fetching) => {
    return { type: "TOGGLE_FETCHING_CHATROOMS", payload: fetching }
}

/**
 * @summary - Getch all chatrooms.
 * @param navigate - useNavigate instance variable [react-router-dom].
 */
export const getChatrooms = (navigate) => {
    return dispatch => {
        dispatch(toggleFetchingChatrooms(true))

        axios.get(`${ process.env.REACT_APP_API }chatrooms/`, {
            headers: { "Authorization": `Bearer ${ localStorage.getItem("token") }` }
        }).then(response => {
            console.log(response)
            dispatch({ type: "SET_CHATROOMS", payload: response.data })
        }).catch(error => {
            console.log(error.response)
        }).finally(() => {
            dispatch(toggleFetchingChatrooms(false))
        })
    }
}
