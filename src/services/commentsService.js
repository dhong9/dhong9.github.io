import { getRequest, postRequest } from "services/baseService";

export const getComments = (success) => {
  getRequest("comments", success, console.error);
};

export const addComment = (success, project, name, email, body, isPlainText, parent = null) => {
  postRequest(
    "comments",
    {
      project,
      name,
      email,
      body,
      isPlainText,
      active: true,
      parent,
    },
    success,
    console.error
  );
};
