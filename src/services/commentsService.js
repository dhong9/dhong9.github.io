import { getRequest, postRequest } from "services/baseService";

// Utility functions for processing comments data
const buildCommentMap = (comments) => {
  const commentsMap = {};
  for (const comment of comments) {
    commentsMap[comment.id] = comment;
  }
  return commentsMap;
};

const buildCommentTree = (comments) => {
  const commentTree = {};
  for (const { id, parent } of comments) {
    // If there is parent, find where to put the
    // comment under
    if (parent) {
      const stack = [commentTree];
      while (stack.length) {
        const current = stack.pop();
        for (const key in current) {
          // Found the parent, so stick comment under it
          if (key == parent) {
            current[key][id] = {};
            break;
          }
          // Keep searching
          stack.push(current[key]);
        }
      }
    }
    // If there is no parent, then make a new
    // root node
    else {
      commentTree[id] = {};
    }
  }
  return commentTree;
};

// Service functions

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
