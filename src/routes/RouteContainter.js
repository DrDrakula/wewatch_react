import React from "react";
import { Route, Routes } from "react-router-dom";
import {Container} from "react-bootstrap";
import NavBar from "../common/NavBar";
import Login from "./Login";
import PrivateRoute from "../common/HOCs/PrivateRoute";
import Chatrooms from "./Chatrooms";
import Home from "./Home";
import Chatroom from "./Chatrooms/Chatroom";

export default function RouteContainer() {
    return (
        <div>
            <Container>
                <NavBar />
                <Routes>
                    <Route path="/login" element={ <Login /> } />
                    <Route exact path="/" element={ <PrivateRoute component={Home} /> } />
                    <Route exact path="/chatrooms" element={ <PrivateRoute component={Chatrooms} /> } />
                    <Route path="/chatrooms/:id" element={ <PrivateRoute component={Chatroom} /> } />
                </Routes>
            </Container>
        </div>
    )
}