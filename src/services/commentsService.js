import { getRequest } from "services/baseService";

export const getComments = (success) => {
  getRequest("comments", success, console.error);
};
