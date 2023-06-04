import { getRequest, postRequest } from "services/baseService";

export const getContacts = (success) => {
  getRequest("contacts", success, console.error);
};

export const addContact = (full_name, email, subject, query_txt) =>
  postRequest("contacts", {
    full_name,
    email,
    subject,
    query_txt,
  });
