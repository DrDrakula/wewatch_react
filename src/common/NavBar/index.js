import React from 'react'
import {NavLink, useNavigate} from 'react-router-dom'
import {Navbar, NavDropdown, Nav, Container} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import './style.scss'


function NavBar() {
    // REACT ROUTER DOM
    const navigate = useNavigate()

    // REDUX
    const dispatch = useDispatch()
    const authenticated = useSelector(state => state.loginReducer.authenticated)
    const user = useSelector(state => state.loginReducer.user)


    const handleLogout = (e) => {
        e.preventDefault()
        localStorage.clear()
        dispatch({ type: "LOG_OUT" })
        dispatch({ type: "RESET_SEARCH_STATE" })
        navigate("/login", { replace: true })
    }

    if (authenticated) {
        return (
            <div style={{ height: "65px" }}>
                <Navbar id="NavBar" bg="light" expand="lg" fixed="top">
                    <Container>
                        <Navbar.Brand>
                            WeWatch
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="ml-auto">
                                <Nav.Link as="span"><NavLink to="/">Chatrooms</NavLink></Nav.Link>
                            </Nav>
                            <Nav>
                                <NavDropdown title={ user.username } id="basic-nav-dropdown">
                                    <NavDropdown.Item>Settings</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item onClick={ handleLogout }>
                                        Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
        )
    } else {
        return null
    }
}


export default NavBar