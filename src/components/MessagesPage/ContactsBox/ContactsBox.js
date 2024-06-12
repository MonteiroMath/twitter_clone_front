import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { LuMailPlus } from "react-icons/lu";
import { CiSettings } from "react-icons/ci";
import { Input } from "reactstrap";

import ContactCard from "./ContactCard/ContactCard";



function ContactsBox() {

  /*

    - Get a list of all the conversation an user have and display one box for each
      - 

   */
  const { recipientID } = useParams();

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
        <ContactCard />
        <ContactCard />
        <ContactCard />
        <ContactCard />
      </div>
    </div>
  );
}

export default ContactsBox;
