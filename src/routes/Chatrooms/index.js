import React, {useEffect} from "react"
import {useDispatch, useSelector} from "react-redux";
import {getChatrooms} from "./reducers/chatroomsReducer";
import {useNavigate} from "react-router-dom";
import { ReactComponent as Spinner } from '../../static/images/spinner.svg';
import {NavLink} from "react-router-dom";


export default function Chatrooms() {
    // REACT ROUTER DOM
    const navigate = useNavigate()

    // REDUX
    const dispatch = useDispatch()
    const fetchingChatrooms = useSelector(state => state.chatroomsReducer.fetchingChatrooms)
    const chatrooms = useSelector(state => state.chatroomsReducer.chatrooms)

    useEffect(() => {
        dispatch(getChatrooms(navigate))
        // eslint-disable-next-line
    }, [])

    return (
        <div id="Chatrooms">
            <h4>
                Chatrooms
            </h4>

            { fetchingChatrooms ?
                <div><Spinner /></div>
                :
                <div className="chatroom-list">
                    { chatrooms.map(chatroom => {
                        return (
                            <div key={chatroom.id}>
                                <NavLink to={`${chatroom.id}`}>{chatroom.name}</NavLink>
                            </div>)
                    }) }
                </div>
            }
        </div>
    )
}