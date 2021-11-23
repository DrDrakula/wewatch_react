import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getChatroom} from "../reducers/chatroomsReducer";
import {useNavigate, useParams} from "react-router-dom";
import {ReactComponent as Spinner} from "../../../static/images/spinner.svg";
import {BsArrowReturnLeft} from "react-icons/bs";


export default function Chatroom() {
    // REACT ROUTER DOM
    const { id } = useParams()
    const navigate = useNavigate()
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
                    <h3>
                        <span onClick={() => navigate("/chatrooms", { replace: true })}>
                            <BsArrowReturnLeft />
                        </span>
                    </h3>
                    <h3>
                        Welcome to { chatroom.name }
                    </h3>
                </div>
            }
        </div>
    )
}