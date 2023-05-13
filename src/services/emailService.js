import { postRequest } from "services/baseService";

export const addContact = (full_name, email, subject, query_txt) => {
  postRequest("contacts", {
    full_name,
    email,
    subject,
    query_txt,
  });
};
