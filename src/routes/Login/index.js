import React, { useEffect, useState } from 'react'
import LoginForm from "./components/LoginForm";
import { ReactComponent as Spinner } from '../../static/images/spinner.svg';
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import './style.scss'


export default function Login() {
    // REACT ROUTER DOM
    const navigate = useNavigate()
    const location = useLocation()

    // REDUX
    const dispatch = useDispatch()
    // STATE
    const [loading, setLoading] = useState(true)

    const checkAuthentication = () => {
        const token = localStorage.getItem("token")
        axios.get(`${process.env.REACT_APP_API}token/verify/`, {
            headers: {
                "Authorization": `Bearer ${ token }`
            }
        })
            .then(response => {
                dispatch({ type: "AUTHENTICATED", payload: response.data })
                setLoading(false)
                if (location.state) {
                    navigate(location.state.pathname)
                } else {
                    navigate("/")
                }
            })
            .catch(error => {
                console.log(error, error.response)
                dispatch({ type: "AUTHENTICATION_FAILED" })
                dispatch({ type: "RESET_SEARCH_STATE" })
                setLoading(false)
                localStorage.clear()
                navigate("/login", { replace: true })
            })
    }

    useEffect(() => {
        if (localStorage.getItem("token")) {
            checkAuthentication()
        } else {
            setLoading(false)
        }
        // eslint-disable-next-line
    }, [location.pathname])

    if (loading) {
        return <div><Spinner /></div>
    } else {
        return (
            <div id="Login">
                <LoginForm />
            </div>
        )
    }
}