import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUserData } from "../../../store/UserSlice";
import { LuMailPlus } from "react-icons/lu";
import { CiSettings } from "react-icons/ci";
import { Input } from "reactstrap";

import { client } from "../../../api/client";

import ContactCard from "./ContactCard/ContactCard";

function ContactsBox() {
 
  const userData = useSelector(selectUserData);

  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    client.getConversations(userData.id).then((result) => {
      if (result.success) {
        setConversations(result.conversations);
      }
    });
  }, [userData.id]);

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
        {conversations.map((conversation) => (
          <ContactCard conversationID={conversation.id} />
        ))}
      </div>
    </div>
  );
}

export default ContactsBox;
