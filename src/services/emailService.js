import { getRequest, postRequest } from "services/baseService";

export const getContacts = (success) => {
  getRequest("contacts", success, console.error);
};

export const addContact = async (full_name, email, subject, query_txt, success) =>
  postRequest("contacts", {
    full_name,
    email,
    subject,
    query_txt,
  }, success, console.error);
