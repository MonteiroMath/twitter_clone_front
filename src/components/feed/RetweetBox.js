import React from "react";
import { Row, Col } from "reactstrap";

import InfoBar from "./InfoBar";
import Avatar from "../Avatar.js";
import Message from "./Message";
import Attachment from "../Attachment";
import Poll from "./Poll";

function RetweetBox(props) {
  let { retweet, user } = props;

  console.log(retweet);

  return (
    <div>
      <Row className="border croundCorners p-3 mt-2" noGutters>
        <Col xs="12">
          <Row noGutters>
            <Avatar size="15px" />
            <div className="ml-2">
              <InfoBar username={user.username} created={retweet.created_at} />
            </div>
          </Row>
        </Col>

        {retweet.attach ? (
          <Col xs="2" className="mr-2">
            <Attachment url={retweet.attach} />
          </Col>
        ) : null}

        <Col>
          <Message message={retweet.message} />
          <Poll
            poll={retweet.poll}
            pollSettings={retweet.pollSettings}
            start={retweet.created}
          />
        </Col>
      </Row>
    </div>
  );
}

export default RetweetBox;
