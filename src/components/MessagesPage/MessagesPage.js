import { Container, Row, Col } from "reactstrap";
import { useSelector } from "react-redux";
import { selectUserData } from "../../store/UserSlice";
import TopBar from "../Shared/Bars/TopBar/TopBar";
import Avatar from "../Shared/Avatar/Avatar";

import styles from "./MessagesPage.module.css";

function MessagesPage() {
  const userData = useSelector(selectUserData);

  console.log(userData);
  return (
    <Container className={`d-flex flex-column ${styles.h100}`}>
      <TopBar header="Matham" />

      <Row className={`flex-column align-items-center p-4 ${styles.rowGap}`}>
        <Avatar />
        <div>{userData.username}</div>
        <div>{`@${userData.username}`}</div>
        <div>{userData.description}</div>
      </Row>
      <Row className="flex-column align-items-end">
        <div>Message 1</div>
        <div>Message 2</div>
        <div>Message 3</div>
      </Row>
      <Row className="mt-auto pb-4">
        <div>message tools</div>
        <input placeholder="Start a new message" />
        <div>submit button</div>
      </Row>
    </Container>
  );
}

export default MessagesPage;
