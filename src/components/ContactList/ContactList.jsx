import {Input} from "../../common/Input";
import {Button} from "../../common/Button";
import Box from "@mui/material/Box";
import { ContactItem } from "../ContactItem/ContactItem";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import storage from "../../utils/storage";

export const ContactList = () => {
  const [contacts, setContacts] = useState([]);

  const [value, setValue] = useState("");

  const [filterValue, setFilterValue] = useState("");

  const handleValueChange = (e) => setValue(e.target.value);

  const resetValue = () => setValue("");

  useEffect(() => {
    const list = storage.get("list");
    setContacts(list || []);
  }, []);

  useEffect(() => {
    storage.save("list", contacts);
  }, [contacts]);

  const onSave = () => {
    const data = {
      number: value,
      id: uuidv4(),
      completed: false,
    };
    value === ""
      ? notifyEmpty()
      : contacts.find((item) => (item.number === value))
      ? notifyExists(value)
      : setContacts((prevState) => {
          return [...prevState, data];
        });
    resetValue();
  };

  const onDelete = (id) => {
    const list = contacts.filter((item) => item.id !== id);
    setContacts(list);
  };

  const onUpdate = (id, text) => {
    const list = contacts.map((item) =>
      item.id === id ? { ...item, number: text } : item
    );
    setContacts(list);
  };

  const visibleContacts = contacts.filter((item) =>
    item.number.includes(filterValue)
  );

  const notifyEmpty = () => toast("Enter a phone number!");

  const notifyExists = (value) => toast(`Number ${value} already exists!`);

  return (
    <div style={{ width: 700, margin: "0 auto" }}>
      <h1>Contacts List</h1>

      <Input
        label="Search phone number ... "
        handleChange={(e) => setFilterValue(e.target.value)}
      />

      <ToastContainer />

      <div style={{ paddingTop: 50 }}>
        <Box component="div">
          <Input
            label="Enter number"
            value={value}
            handleChange={handleValueChange}
          />
          <Button lable="Save" onClick={onSave} />
        </Box>
      </div>

      <ul>
        {visibleContacts &&
          visibleContacts.map((item) => (
            <ContactItem
              key={item.id}
              contact={item}
              onDelete={onDelete}
              onUpdate={onUpdate}
            />
          ))}
      </ul>
    </div>
  );
};
