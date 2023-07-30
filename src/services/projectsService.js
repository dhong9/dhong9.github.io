import { getRequest } from "services/baseService";

export const getProjects = (success) => {
  getRequest("projects/", success, console.error);
};
