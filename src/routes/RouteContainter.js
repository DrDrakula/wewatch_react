import React from "react";
import NavBar from "../common/NavBar";
import { Route, Routes } from "react-router-dom";
import Login from "./Login";
import PrivateRoute from "../common/HOCs/PrivateRoute";
import Chatrooms from "./Chatrooms";
import {Container} from "react-bootstrap";

export default function RouteContainer() {
    return (
        <div>
            <Container>
                <NavBar />
                <Routes>
                    <Route path="/login" element={ <Login /> } />
                    <Route path="/" element={ <PrivateRoute component={Chatrooms} /> } />
                    {/*<PrivateRoute title="Chatrooms" exact path="/" component={ Chatrooms } />*/}
                </Routes>
            </Container>
        </div>
    )
}