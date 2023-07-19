import { useSelector } from "react-redux";
import { Col } from "react-bootstrap";
import InputNewMessage from "./InputNewMessage.jsx";

const Messages = () => {
    const { channels, currentChannelId } = useSelector((state) => state.channelsInfo);
    const { messages } = useSelector((state) => state.messagesInfo);
    const messagesForCurrentChannel = messages.filter(({channelId}) => channelId === currentChannelId);
    const currentChannel = channels.find((channel) => channel.id === currentChannelId);
    return (
        <Col className="p-0 h-100">
                <div className="d-flex flex-column h-100">
                    <div className="bg-light mb-4 p-3 shadow-sm small">
                    <p className="m-0">
                        <b># {currentChannel.name}</b>
                    </p>
                    <span className="text-mutted">{messages.length} сообщений</span>
                </div>
                <div id="messages-box" className="chat-messages overflow-auto px-5">
                    {messagesForCurrentChannel.map(({ body, username, id }) => (
                        <div key={id} className="text-break mb-2">
                            <b>{username}</b>
                            :
                            {body}
                        </div>
                    ))}
                </div>
                <div className="mt-auto px-5 py-3">
                    <InputNewMessage />
                </div>
            </div>
            
        </Col>
    );
};

export default Messages;