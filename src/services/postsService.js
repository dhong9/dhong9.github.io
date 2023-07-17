import { getRequest, postRequest } from "services/baseService";

export const getPosts = (success) => {
  getRequest("posts", success, console.error);
};

export const getPostById = (id, success) => {
  getRequest("posts/" + id, success, console.error);
};

export const addPost = (
  success,
  postName,
  category,
  name,
  email,
  body,
  isPlainText,
  mainFeatured,
  featured
) => {
  postRequest(
    "posts",
    {
      postName,
      category,
      name,
      email,
      body,
      isPlainText,
      mainFeatured,
      featured,
      active: true,
      parent: null,
    },
    success,
    console.error
  );
};
