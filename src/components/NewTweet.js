import Avatar from "./Avatar";
import { Row, Col, Form, Input, Button } from "reactstrap";

import image from "../icons/image.svg";
import poll from "../icons/pool.svg";
import emoji from "../icons/emoji.svg";
import schedule from "../icons/schedule.svg";
import gif from "../icons/gif.svg";

function NewTweet(props) {
  return (
    <Col className="border m-auto p-3" xs="12" md="10" lg="6">
      <Row noGutters={true}>
        <Col xs="2">
          <Avatar />
        </Col>

        <Col>
          <Form>
            <Input type="textarea" placeholder="What's happening?" />
            <Input className="mt-3" type="select">
              <option>Everyone </option>
              <option>People you follow</option>
              <option>Only people you mention</option>
            </Input>
          </Form>
          <div>
            <div className="d-flex pt-2">
              <div className="mr-3">
                <img src={image} alt="add image icon" width="15px" />
              </div>
              <div className="mr-3">
                <img src={gif} alt="gif icon" width="15px" />
              </div>
              <div className="mr-3">
                <img src={poll} alt="poll icon" width="15px" />
              </div>
              <div className="mr-3">
                <img src={emoji} alt="emoji icon" width="15px" />
              </div>
              <div>
                <img src={schedule} alt="schedule icon" width="15px" />
              </div>

              <Button className="ml-auto mr-4 round" color="info">
                Tweet
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </Col>
  );
}

export default NewTweet;
