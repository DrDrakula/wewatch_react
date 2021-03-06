import React, {useState} from 'react'
import {Alert, Button, Form} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {authenticate} from "../reducers/loginReducer";
import {useLocation, useNavigate} from "react-router-dom";


export default function LoginForm() {
    // REACT ROUTER DOM
    const navigate = useNavigate()
    const location = useLocation()

    // REDUX
    const dispatch = useDispatch()
    const errorMessage = useSelector(state => state.loginReducer.errorMessage)

    // STATE
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(authenticate({ username, password }, navigate, location))
    }

    return (
        <div id="login-form">
            <Form onSubmit={ handleSubmit }>
                <Form.Group>
                    <Form.Label>Username:</Form.Label>
                    <Form.Control type="text" placeholder="username" value={ username } onChange={ (e) => setUsername(e.target.value) } />
                </Form.Group>
                <br/>
                <Form.Group>
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type="password" placeholder="password" value={ password } onChange={ (e) => setPassword(e.target.value) }  />
                </Form.Group>
                <br/>
                { errorMessage ? <Alert variant="danger">{ errorMessage }</Alert> : null }
                <Button className="login-btn" variant="primary" type="submit">
                    Log In
                </Button>
            </Form>
        </div>
    )
}