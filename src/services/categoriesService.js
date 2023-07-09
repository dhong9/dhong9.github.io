import { getRequest, postRequest } from "services/baseService";

export const getCategories = (success) => {
  getRequest("categories", success, console.error);
};

export const addCategory = (success, name, description) => {
  postRequest(
    "categories",
    {
      name,
      description,
    },
    success,
    console.error
  );
};
