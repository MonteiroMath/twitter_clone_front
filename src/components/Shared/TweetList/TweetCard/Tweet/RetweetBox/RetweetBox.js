import React from "react";
import { Row, Col } from "reactstrap";

import InfoBar from "../InfoBar/InfoBar";
import Message from "../Message/Message";
import Poll from "../Poll/Poll";

import Attachment from "../../../../Attachment/Attachment";
import Avatar from "../../../../Avatar/Avatar";

function RetweetBox(props) {
  let { retweet, user } = props;

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
