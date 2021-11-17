import React, { useEffect, useState } from 'react'
import { useLocation, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { resetAllStates } from '../../routes/Login/reducers/loginReducer';
import { ReactComponent as Spinner } from '../../static/images/spinner.svg';
import axios from 'axios'


function PrivateRoute({ component: Component, title, ...rest }) {
    // STATE
    const [loading, setLoading] = useState(true)
    const [redirect, setRedirect] = useState(false)

    // REACT ROUTER DOM
    const location = useLocation()

    // REDUX
    const dispatch = useDispatch()
    const authenticated = useSelector(state => state.loginReducer.authenticated)


    const checkAuthentication = () => {
        const token = localStorage.getItem("token")
        setLoading(true)
        axios.get(`${process.env.REACT_APP_API}token/verify/`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(response => {
                dispatch({ type: "AUTHENTICATED", payload: response.data })
                setLoading(false)
            })
            .catch(error => {
                console.log(error, error.response)
                dispatch({ type: "AUTHENTICATION_FAILED" })
                dispatch(resetAllStates())
                setLoading(false)
                setRedirect(true)
                localStorage.clear()
            })
    }


    useEffect(() => {
        checkAuthentication()
        // eslint-disable-next-line
    }, [location.pathname])


    if (localStorage.getItem("token") && authenticated) {
        document.title = `WeWatch${ title ? ` - ${ title }` : ""}`
        return <Component />
    } else if (loading) {
        return <div className="login" id="LoginContainer"><Spinner /></div>
    } else if (redirect) {
        return <Navigate to="/login" state={ location } replace={ true } />
    } else {
        return <div>There has been an issue with the server</div>
    }

}

export default PrivateRoute