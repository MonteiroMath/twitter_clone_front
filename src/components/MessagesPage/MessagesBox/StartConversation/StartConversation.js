import { useState } from "react";

import { Button } from "reactstrap";
import NewMessageModal from "../../../Shared/Modals/NewMessageModal/NewMessageModal";

function StartConversation() {
  const [isOpen, setIsOpen] = useState(false);

  function toggle() {
    setIsOpen((prev) => !prev);
  }

  return (
    <>
      <div className="h-100 p-5 d-flex flex-column justify-content-center align-items-center c-rgap-20">
        <div className="cfw-bolder cfs-30 ">Select a message</div>
        <div className="text-justify">
          Chosse from your existing conversations, start a new one or just keep
          swimming
        </div>
        <Button color="primary" onClick={toggle}>
          New Message
        </Button>
      </div>
      <NewMessageModal isOpen={isOpen} toggle={toggle} />
    </>
  );
}

export default StartConversation;
