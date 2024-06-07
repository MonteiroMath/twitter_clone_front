import LeftBar from "../MainLayout/LeftBar/LeftBar";
import ContactsBox from "./ContactsBox/ContactsBox";
import MessagesBox from "./MessagesBox/MessagesBox";
import { Container, Row, Col } from "reactstrap";

function MessagesPage() {
  return (
    <Container>
      <Row>
        <Col className="d-none d-sm-block pt-1 " sm="2" lg="4" xl="3">
          <LeftBar />
        </Col>
        <Col className="d-none d-xl-block mt-3 " sm="2" xl="4">
          <ContactsBox />
        </Col>
        <Col className="ml-auto p-0" xs="12" sm="10" lg="8" xl="5">
          <MessagesBox />
        </Col>
      </Row>
    </Container>
  );
}

export default MessagesPage;
