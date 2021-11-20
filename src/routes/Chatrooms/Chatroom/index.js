import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getChatroom} from "../reducers/chatroomsReducer";
import {useParams} from "react-router-dom";
import {ReactComponent as Spinner} from "../../../static/images/spinner.svg";


export default function Chatroom() {
    // REACT ROUTER DOM
    const { id } = useParams()
    // REDUX
    const dispatch = useDispatch()
    const chatroom = useSelector(state => state.chatroomsReducer.chatroom)
    const loadingChatroom = useSelector(state => state.chatroomsReducer.loadingChatroom)

    useEffect(() => {
        dispatch(getChatroom(id))
        // eslint-disable-next-line
    },[])

    return (
        <div id="Chatroom">
            { loadingChatroom ?
                <div><Spinner /></div>
                :
                <div>
                    Welcome to { chatroom.name }
                </div>
            }
        </div>
    )
}