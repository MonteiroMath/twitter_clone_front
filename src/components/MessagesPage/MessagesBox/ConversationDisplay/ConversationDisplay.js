import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Row, Col, Input, Button } from "reactstrap";
import { io } from "socket.io-client";

import TopBar from "../../../Shared/Bars/TopBar/TopBar";
import Avatar from "../../../Shared/Avatar/Avatar";
import styles from "../../MessagesPage.module.css";

import { selectUserData, selectJwtToken } from "../../../../store/UserSlice";

import { client } from "../../../../api/client";
import { useEffect } from "react";

import MessagesList from "./MessagesList/MessagesList";

function ConversationDisplay() {
  const { conversationID } = useParams();
  const userData = useSelector(selectUserData);
  const jwtToken = useSelector(selectJwtToken);

  const [recipientUser, setRecipientUser] = useState({});
  const [messageList, setMessageList] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    client.getSummary(conversationID, jwtToken).then((result) => {
      if (result.success) {
        const { conversation } = result;

        const toUser = conversation.participants.find(
          (participant) => participant.id !== userData.id
        );

        setRecipientUser(toUser);
      } else {
        console.log("error");
      }
    });
  }, [userData.id, conversationID, jwtToken]);

  useEffect(() => {
    client.getMessages(conversationID, jwtToken).then((result) => {
      if (result.success) {
        setMessageList(result.messages);
      } else {
        console.log("error");
      }
    });
  }, [conversationID, jwtToken]);

  useEffect(() => {
    const socket = io("http://localhost:6868");

    socket.on("NEW_MESSAGE", (data) => {
      if (data.action === "CREATE") {
        const { message } = data;

        if (message.conversationID === parseInt(conversationID)) {
          setMessageList((prev) => [...prev, message]);
        }
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [conversationID]);

  function handleWriteMessage(e) {
    const { value } = e.target;
    setMessage(value);
  }

  function handleSendMessage(e) {
    e.preventDefault();

    const newMessage = {
      userID: userData.id,
      message,
    };

    setMessage("");

    client.postMessage(conversationID, newMessage, jwtToken);
  }

  return (
    <div className={`d-flex flex-column ${styles.h100}`}>
      <TopBar header="Matham" />

      <Row className={`flex-column align-items-center p-4 ${styles.rowGap}`}>
        <Avatar avatar={recipientUser.avatar} />
        <div>{recipientUser.username}</div>
        <div>{`@${recipientUser.username}`}</div>
      </Row>
      <Row className="flex-column align-items-end px-5 flex-grow-1 flex-nowrap c-mh-100">
        <MessagesList messages={messageList} userID={userData.id} />
      </Row>
      <Row className="d-flex pb-4 justify-content-around align-items-center px-4 mt-3">
        <Col>
          <Input
            placeholder="Start a new message"
            value={message}
            onChange={handleWriteMessage}
          />
        </Col>
        <Button color="primary" size="sm" onClick={handleSendMessage}>
          Send
        </Button>
      </Row>
    </div>
  );
}

export default ConversationDisplay;
