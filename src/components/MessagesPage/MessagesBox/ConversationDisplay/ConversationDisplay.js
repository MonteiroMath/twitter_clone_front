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

function ConversationDisplay() {
  //get messages from user messaged

  const { recipientName } = useParams();
  const userData = useSelector(selectUserData);
  const jwtToken = useSelector(selectJwtToken);

  const [recipientUser, setRecipientUser] = useState({});
  const [messageList, setMessageList] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    //setLoadingState("loading");
    client.getUserData(recipientName, jwtToken).then((result) => {
      if (result.success) {
        setRecipientUser(result.user);
        //setLoadingState("success");
      } else {
        //setLoadingState("failed");
        console.log("error");
      }
    });
  }, [recipientName, jwtToken]);

  useEffect(() => {
    if (recipientUser.id) {
      client
        .getMessages(userData.id, recipientUser.id, jwtToken)
        .then((result) => {
          if (result.success) {
            setMessageList(result.messages);
          } else {
            console.log("error");
          }
        });
    }
  }, [recipientUser.id, userData.id, jwtToken]);

  useEffect(() => {
    const socket = io("http://localhost:6868");

    socket.on("NEW_MESSAGE", (data) => {
      if (data.action === "CREATE") {
        const { message } = data;

        if (
          message.authorID === userData.id ||
          message.recipientID === userData.id
        ) {
          setMessageList((prev) => [...prev, message]);
        }
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  function handleWriteMessage(e) {
    const { value } = e.target;
    setMessage(value);
  }

  function handleSendMessage(e) {
    e.preventDefault();

    const newMessage = {
      authorID: userData.id,
      recipientID: recipientUser.id,
      message,
    };

    client.postMessage(newMessage, jwtToken);
  }

  return (
    <div className={`d-flex flex-column ${styles.h100}`}>
      <TopBar header="Matham" />

      <Row className={`flex-column align-items-center p-4 ${styles.rowGap}`}>
        <Avatar avatar={recipientUser.avatar} />
        <div>{recipientUser.username}</div>
        <div>{`@${recipientUser.username}`}</div>
        <div>{recipientUser.description}</div>
      </Row>
      <Row className="flex-column align-items-end pr-5">
        {messageList.map((message) => (
          <div key={message.id}>{message.message}</div>
        ))}
      </Row>
      <Row className="d-flex mt-auto pb-4 justify-content-around align-items-center px-4">
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
