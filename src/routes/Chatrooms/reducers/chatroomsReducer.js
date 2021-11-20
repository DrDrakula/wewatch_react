import axios from 'axios'

const initialState = {
    chatrooms: [],
    chatroom: null,
    loadingChatrooms: true,
    loadingChatroom: true,
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
        case "SET_CHATROOM":
            return {
                ...state,
                chatroom: action.payload
            }
        case "TOGGLE_LOADING_CHATROOMS":
            return {
                ...state,
                loadingChatrooms: action.payload
            }
        case "TOGGLE_LOADING_CHATROOM":
            return {
                ...state,
                loadingChatroom: action.payload
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
export const toggleLoadingChatrooms = (fetching) => {
    return { type: "TOGGLE_LOADING_CHATROOMS", payload: fetching }
}
export const toggleLoadingChatroom = (fetching) => {
    return { type: "TOGGLE_LOADING_CHATROOM", payload: fetching }
}

/**
 * @summary - Getch all chatrooms.
 */
export const getChatrooms = () => {
    return dispatch => {
        dispatch(toggleLoadingChatrooms(true))

        axios.get(`${ process.env.REACT_APP_API }chatrooms/`, {
            headers: { "Authorization": `Bearer ${ localStorage.getItem("token") }` }
        }).then(response => {
            console.log(response)
            dispatch({ type: "SET_CHATROOMS", payload: response.data })
        }).catch(error => {
            console.log(error.response)
        }).finally(() => {
            dispatch(toggleLoadingChatrooms(false))
        })
    }
}

/**
 * @summary - Getch all chatrooms.
 * @param {string} id - Chatroom ID.
 */
export const getChatroom = id => {
    return dispatch => {
        dispatch(toggleLoadingChatroom(true))

        axios.get(`${ process.env.REACT_APP_API }chatrooms/${id}`, {
            headers: { "Authorization": `Bearer ${ localStorage.getItem("token") }` }
        }).then(response => {
            console.log(response)
            dispatch({ type: "SET_CHATROOM", payload: response.data })
        }).catch(error => {
            console.log(error.response)
        }).finally(() => {
            dispatch(toggleLoadingChatroom(false))
        })
    }
}
