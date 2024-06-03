import { Button } from "reactstrap";

function StartConversation() {
  return (
    <div className="h-100 p-5 d-flex flex-column justify-content-center align-items-center c-rgap-20">
      <div className="cfw-bolder cfs-30 ">Select a message</div>
      <div className="text-justify">
        Chosse from your existing conversations, start a new one or just keep
        swimming
      </div>
      <Button color="primary">New Message</Button>
    </div>
  );
}

export default StartConversation;
