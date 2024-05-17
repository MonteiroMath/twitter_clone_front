import { Row, Col } from "reactstrap";
import { LuMailPlus } from "react-icons/lu";
import { CiSettings } from "react-icons/ci";
import { Input } from "reactstrap";

import Avatar from "../../Shared/Avatar/Avatar";

function ContactsBox() {
  return (
    <div>
      <div className="d-flex align-items-center p-1">
        <span className="cfw-bolder cfs-20">Messages </span>
        <CiSettings className="ml-auto" size="24" />
        <LuMailPlus className="mx-2" size="24" />
      </div>
      <div className="mt-4">
        <Input placeholder="Search Direct Messages" />
      </div>
      <div className="mt-5">
        <Row>
          <Col lg="4" xl="3">
            <Avatar />
          </Col>
          <Col>
            <div>
              {" "}
              <span className="cfw-bolder">Contact name </span> -{" "}
              <span className="text-muted">December 12</span>
            </div>
            <div>last message...</div>{" "}
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default ContactsBox;
