import { getRequest, postRequest } from "services/baseService";

export const getComments = (success) => {
  getRequest("comments", success, console.error);
};

export const addComment = (success, pageName, name, email, body) => {
  postRequest(
    "comments",
    {
      pageName,
      name,
      email,
      body,
      active: true,
      parent: null,
    },
    success,
    console.error
  );
};
