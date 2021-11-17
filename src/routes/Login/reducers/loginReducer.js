import axios from "axios";

const initialState = {
    authenticated: false,
    authenticating: false,
    checkingAuthentication: false,
    user: null,
    errorMessage: "",
}

// ************************ REDUCER ************************
export function loginReducer(state = initialState, action) {
    switch(action.type) {
        case "AUTHENTICATING":
            return {
                ...state,
                authenticating: true,
                errorMessage: ""
            }
        case "CHECKING_AUTHENTICATION":
            return {
                ...state,
                checkAuthentication: true
            }
        case "AUTHENTICATED":
            return {
                ...state,
                authenticating: false,
                authenticated: true,
                checkingAuthentication: false,
                user: action.payload,
                errorMessage: ""
            }
        case "AUTHENTICATION_FAILED":
            return {
                ...state,
                authenticating: false,
                authenticated: false,
                checkingAuthentication: false,
                user: null,
                errorMessage: action.payload
            }
        case "LOG_OUT":
            return {
                ...initialState
            }
        default:
            return state
    }
}

// ************************ ACTIONS ************************
/**
 * @summary Sets an error message
 * @param errorMessage - Text that explains the error message.
 */
export const setErrorMessage = (errorMessage) => {
    return { type: "AUTHENTICATION_FAILED", payload: errorMessage }
}

/**
 * @summary - Resets the redux store
 */
export const resetAllStates = () => {
    return dispatch => {
        dispatch({ type: "RESET_SEARCH_STATE" })
        dispatch({ type: "RESET_COLLECTIONS_STATE" })
    }
}

/**
 * @summary - Authenticates and logs in the user if the user provides correct credentials.
 * @param {Object} credentials - Object that contains the username and password.
 * @param navigate - useNavigate instance variable [react-router-dom].
 * @param location - useLocation instance variable [react-router-dom].
 */
export const authenticate = (credentials, navigate, location) => {
    return dispatch => {
        dispatch({ type: "AUTHENTICATING" })

        axios.post(`${process.env.REACT_APP_API}login/`, {
            username: credentials.username,
            password: credentials.password
        })
            .then(response => {
                const token = response.data.access_token
                localStorage.setItem("token", token)
                dispatch({ type: "AUTHENTICATED", payload: response.data })

                if (location.state) {
                    navigate(location.state.pathname, { replace: true })
                } else {
                    navigate("/", { replace: true })
                }
            })
            .catch(error => {
                let errorMessage = ""
                if (error.response && error.response.data) {
                    if (typeof error.response.data === "string") {
                        errorMessage = error.response.data
                    } else if (error.response.data.non_field_errors) {
                        errorMessage = error.response.data.non_field_errors[0]
                    }
                } else {
                    errorMessage = "There was an error with the server. Please contact support."
                }
                console.log(error, error.response, errorMessage)
                dispatch(setErrorMessage(errorMessage))
            })
    }
}

/**
 * @summary - Deals with axios error responses.
 * @param {Object} error - Error object parameter gotten from the .catch() function.
 * @param {function} errorMessageCallback - Error message setting function.
 * @param {Object} history - react-router-dom's useHistory() object.
 */
export const catchRequestError = (error, errorMessageCallback, navigate) => {
    return dispatch => {
        if (error.response) {
            if (error.response.data === "Invalid Authentication" || error.response.data === "Missing Authorization header") {
                dispatch(resetAllStates())
                dispatch({ type: "AUTHENTICATION_FAILED", payload: "Your Session Has Expired" })
                localStorage.clear()
                navigate("/login", { replace: true })
            } else if (error.response.status === 500) {
                dispatch(errorMessageCallback("Can't reach the server. Please try again."))
            } else {
                dispatch(errorMessageCallback("Oops! Something went wrong. Please contact the administrator at info@evidscience.com"))
            }
        } else {
            dispatch(errorMessageCallback("Request timed out. Please try again."))
        }
    }
}